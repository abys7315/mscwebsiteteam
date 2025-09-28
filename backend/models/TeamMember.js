const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  regNumber: {
    type: String,
    required: [true, 'Registration number is required'],
    unique: true,
    trim: true,
    maxlength: [20, 'Registration number cannot be more than 20 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  contactNumber: {
    type: String,
    required: [true, 'Contact number is required'],
    trim: true,
    match: [/^[0-9+\-\s()]+$/, 'Please enter a valid contact number']
  },
  githubLink: {
    type: String,
    trim: true
  },
  linkedinLink: {
    type: String,
    trim: true
  },
  resumeLink: {
    type: String,
    trim: true
  },
  portfolioLink: {
    type: String,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  shortBio: {
    type: String,
    trim: true,
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  imagePath: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['Admin Department', 'Technical Team', 'Hi-Tech Team', 'Marketing Team', 'Design/Creative Team', 'Documentation Team', 'Event Management Team', 'Outreach Team', 'Public Relations Team', 'Programs Team', 'Research and Development Team'],
      message: 'Please select a valid department'
    }
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    trim: true,
    maxlength: [100, 'Role cannot be more than 100 characters']
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

teamMemberSchema.index({ department: 1 });

// Virtual for full name (if needed)
teamMemberSchema.virtual('fullName').get(function() {
  return this.name;
});

// Pre-save middleware
teamMemberSchema.pre('save', function(next) {
  // Convert skills array to lowercase and remove duplicates
  if (this.skills && this.skills.length > 0) {
    this.skills = [...new Set(this.skills.map(skill => skill.toLowerCase().trim()))];
  }
  next();
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);
