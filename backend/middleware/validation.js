const { body, validationResult } = require('express-validator');

// Validation rules for team member registration
const validateTeamMember = [
  // --- REQUIRED FIELDS ---
  // Made 'name' a required field
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s]+$/).withMessage('Name can only contain letters and spaces'),

  // Made 'regNumber' a required field
  body('regNumber')
    .trim()
    .notEmpty().withMessage('Registration number is required')
    .isLength({ min: 1, max: 20 }).withMessage('Registration number cannot exceed 20 characters'),

  // Made 'email' a required field
  body('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),

  // Made 'contactNumber' a required field
  body('contactNumber')
    .trim()
    .notEmpty().withMessage('Contact Number is required')
    .isLength({ min: 10, max: 10 }).withMessage('Contact Number must be exactly 10 digits')
    .matches(/^[0-9]+$/).withMessage('Contact Number can only contain digits'), // Simplified regex for digits only

  // Made 'department' a required field
  body('department')
    .notEmpty().withMessage('Department is required')
    .isIn(['Admin Department', 'Technical Team', 'Hi-Tech Team', 'Marketing Team', 'Design/Creative Team', 'Documentation Team', 'Event Management Team', 'Outreach Team', 'Public Relations Team', 'Programs Team', 'Research and Development Team']).withMessage('Please select a valid department'),

  // Made 'role' a required field
  body('role')
    .trim()
    .notEmpty().withMessage('Role is required')
    .isLength({ min: 1, max: 100 }).withMessage('Role cannot exceed 100 characters'),

  // --- REQUIRED FIELDS ---
  body('githubLink')
    .notEmpty().withMessage('GitHub Link is required')
    .isURL().withMessage('GitHub Link must be a valid URL')
    .matches(/^https:\/\/github\.com\//).withMessage('GitHub Link must start with https://github.com/'),

  body('linkedinLink')
    .notEmpty().withMessage('LinkedIn Link is required')
    .isURL().withMessage('LinkedIn Link must be a valid URL')
    .matches(/^https:\/\/(www\.)?linkedin\.com\/in\//).withMessage('LinkedIn Link must start with https://www.linkedin.com/in/'),

  body('resumeLink')
    .notEmpty().withMessage('Resume Link is required')
    .isURL().withMessage('Resume Link must be a valid URL'),

  body('portfolioLink')
    .notEmpty().withMessage('Portfolio Link is required')
    .isURL().withMessage('Portfolio Link must be a valid URL'),

  body('skills')
    .notEmpty().withMessage('Skills is required')
    .isString().withMessage('Skills must be a comma-separated string'),

  body('shortBio')
    .notEmpty().withMessage('Short Bio is required')
    .trim()
    .isLength({ max: 500 }).withMessage('Bio cannot exceed 500 characters'),

  // IMPORTANT: The validation for the image file itself should be handled
  // by your file upload middleware (like multer), not here. This validator
  // checks req.body, but the file exists in req.file after upload.
  // The original 'imagePath' validator was removed as it was incorrect.
];

// Middleware to handle validation errors (this remains the same)
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateTeamMember,
  handleValidationErrors
};
