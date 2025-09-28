const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const TeamMember = require('../models/TeamMember');
const { validateTeamMember, handleValidationErrors } = require('../middleware/validation');

const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure multer for file uploads
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'msc-team',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
    transformation: [
      { width: 300, height: 300, crop: 'fill' },
      { quality: 'auto' }
    ]
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// POST /api/team-members - Register new team member
router.post(
  '/',
  upload.single('imageFile'),
  (req, res, next) => {
    if (req.file) {
      req.body.imagePath = req.file.path;
    }
    next();
  },
  validateTeamMember,
  handleValidationErrors,
  async (req, res) => {
    try {
      // Check if team member already exists
      const existingMember = await TeamMember.findOne({
        $or: [
          { email: req.body.email },
          { regNumber: req.body.regNumber }
        ]
      });

      if (existingMember) {
        return res.status(400).json({
          success: false,
          message: 'Team member with this email or registration number already exists'
        });
      }

      // Create new team member
      const teamMemberData = {
        ...req.body,
        skills: req.body.skills ? req.body.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : []
      };

      if (req.file) {
        teamMemberData.imagePath = req.file.path;
      }

      const teamMember = new TeamMember(teamMemberData);

      const savedMember = await teamMember.save();

      res.status(201).json({
        success: true,
        message: 'Team member registered successfully',
        data: {
          id: savedMember._id,
          name: savedMember.name,
          email: savedMember.email,
          department: savedMember.department,
          role: savedMember.role
        }
      });
    } catch (error) {
      console.error('Error registering team member:', error);

      if (error.name === 'ValidationError') {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: Object.values(error.errors).map(err => ({ field: err.path, message: err.message }))
        });
      }

      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate entry - email or registration number already exists'
        });
      }

      res.status(500).json({
        success: false,
        message: 'Server error while registering team member',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// GET /api/team-members - Get all team members
router.get('/', async (req, res) => {
  try {
    const { department, page = 1, limit = 10 } = req.query;
    const query = department ? { department } : {};

    const teamMembers = await TeamMember.find(query)
      .select('-__v')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await TeamMember.countDocuments(query);

    res.json({
      success: true,
      data: teamMembers,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching team members',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/team-members/:id - Get single team member
router.get('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findById(req.params.id).select('-__v');

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      data: teamMember
    });
  } catch (error) {
    console.error('Error fetching team member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// PUT /api/team-members/:id - Update team member
router.put(
  '/:id',
  validateTeamMember,
  handleValidationErrors,
  async (req, res) => {
    try {
      const teamMember = await TeamMember.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          skills: req.body.skills ? req.body.skills.split(',').map(skill => skill.trim()).filter(skill => skill) : []
        },
        { new: true, runValidators: true }
      ).select('-__v');

      if (!teamMember) {
        return res.status(404).json({
          success: false,
          message: 'Team member not found'
        });
      }

      res.json({
        success: true,
        message: 'Team member updated successfully',
        data: teamMember
      });
    } catch (error) {
      console.error('Error updating team member:', error);
      res.status(500).json({
        success: false,
        message: 'Server error while updating team member',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
);

// DELETE /api/team-members/:id - Delete team member
router.delete('/:id', async (req, res) => {
  try {
    const teamMember = await TeamMember.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found'
      });
    }

    res.json({
      success: true,
      message: 'Team member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting team member',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
