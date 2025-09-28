import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
// Assuming StarryBackground is a valid component in your project structure
// import StarryBackground from '../components/StarryBackground';

// Placeholder for StarryBackground to make the component self-contained
const StarryBackground = () => <div className="absolute inset-0 bg-gray-900"></div>;

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001/api';

const TeamRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    regNumber: '',
    email: '',
    contactNumber: '',
    githubLink: '',
    linkedinLink: '',
    resumeLink: '',
    portfolioLink: '',
    skills: '',
    shortBio: '',
    imageFile: null as File | null,
    department: '',
    role: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidUrl = (string: string): boolean => {
    if (!string) return false;
    try {
      new URL(string);
      return string.startsWith('http://') || string.startsWith('https://');
    } catch (_) {
      return false;
    }
  };

  const departments = [
    'Admin Department',
    'Technical Team',
    'Hi-Tech Team',
    'Marketing Team',
    'Design/Creative Team',
    'Documentation Team',
    'Event Management Team',
    'Outreach Team',
    'Public Relations Team',
    'Programs Team',
    'Research and Development Team'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous errors
    setIsSubmitting(true);

    // --- NEW: COMPREHENSIVE CLIENT-SIDE VALIDATION ---

    // 1. Required Fields Check
    if (!formData.name.trim()) return setErrorMessage('Name is required');
    if (!formData.regNumber.trim()) return setErrorMessage('Registration number is required');
    if (!formData.email.trim()) return setErrorMessage('Email is required');
    if (!formData.contactNumber.trim()) return setErrorMessage('Contact Number is required');
    if (!formData.department) return setErrorMessage('Department is required');
    if (!formData.role.trim()) return setErrorMessage('Role is required');
    if (!formData.githubLink.trim()) return setErrorMessage('GitHub Link is required');
    if (!formData.linkedinLink.trim()) return setErrorMessage('LinkedIn Link is required');
    if (!formData.resumeLink.trim()) return setErrorMessage('Resume Link is required');
    if (!formData.portfolioLink.trim()) return setErrorMessage('Portfolio Link is required');
    if (!formData.skills.trim()) return setErrorMessage('Skills is required');
    if (!formData.shortBio.trim()) return setErrorMessage('Short Bio is required');
    if (!formData.imageFile) return setErrorMessage('Profile image is required');

    // 2. Format and Length Validation
    if (formData.name.trim().length < 2 || formData.name.trim().length > 100) return setErrorMessage('Name must be between 2 and 100 characters');
    if (!/^[a-zA-Z\s]+$/.test(formData.name)) return setErrorMessage('Name can only contain letters and spaces');
    
    if (formData.regNumber.trim().length > 20) return setErrorMessage('Registration number cannot exceed 20 characters');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return setErrorMessage('Please provide a valid email');

    if (!/^[0-9]+$/.test(formData.contactNumber) || formData.contactNumber.length !== 10) return setErrorMessage('Contact Number must be exactly 10 digits');

    // 3. Optional Fields Validation (if filled)
    if (formData.githubLink && (!isValidUrl(formData.githubLink) || !/^https:\/\/github\.com\//.test(formData.githubLink))) {
        return setErrorMessage('GitHub Link must be a valid URL starting with https://github.com/');
    }
    if (formData.linkedinLink && (!isValidUrl(formData.linkedinLink) || !/^https:\/\/(www\.)?linkedin\.com\/in\//.test(formData.linkedinLink))) {
        return setErrorMessage('LinkedIn Link must be a valid URL starting with https://linkedin.com/in/');
    }
    if (formData.resumeLink && !isValidUrl(formData.resumeLink)) return setErrorMessage('Resume Link must be a valid URL');
    if (formData.portfolioLink && !isValidUrl(formData.portfolioLink)) return setErrorMessage('Portfolio Link must be a valid URL');
    
    if (formData.shortBio.length > 500) return setErrorMessage('Bio cannot exceed 500 characters');

    // 4. Image File Validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(formData.imageFile.type)) return setErrorMessage('Profile image must be JPEG, PNG, or GIF');
    if (formData.imageFile.size > 5 * 1024 * 1024) return setErrorMessage('Profile image must be less than 5MB');
    
    // --- END OF VALIDATION ---

    try {
      const formDataToSend = new FormData();
      // Append all form data fields
      Object.keys(formData).forEach(key => {
        const value = formData[key as keyof typeof formData];
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch(`${API_BASE}/team-members`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        toast.success('Team profile registered successfully!');
        setFormData({
          name: '', regNumber: '', email: '', contactNumber: '', githubLink: '',
          linkedinLink: '', resumeLink: '', portfolioLink: '', skills: '',
          shortBio: '', imageFile: null, department: '', role: ''
        });
        setImagePreview(null);
        setErrorMessage('');
        setIsSubmitting(false);
      } else {
        const errorData = await response.json();
        let errorMsg = errorData.message || 'Registration failed';
        // Use the first error message from the server's validation array
        if (errorData.errors && errorData.errors.length > 0) {
          errorMsg = errorData.errors[0].msg;
        }
        setErrorMessage(errorMsg);
        toast.error(errorMsg);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const netError = 'Network error. Please try again.';
      setErrorMessage(netError);
      toast.error(netError);
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, imageFile: file }));
    if (file) {
      // Clean up the previous object URL to prevent memory leaks
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="absolute inset-0 bg-black/20 -mx-4" />

        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
                Team Member Registration
              </h1>
              <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300">
                Register your profile to be featured on the team page.
              </p>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="apple-card p-8"
            >
              {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  <p className="text-sm">{errorMessage}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Full Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="apple-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Registration Number *</label>
                    <input
                      type="text"
                      value={formData.regNumber}
                      onChange={(e) => handleInputChange('regNumber', e.target.value)}
                      className="apple-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Email *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="apple-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Contact Number *</label>
                    <input
                      type="tel"
                      value={formData.contactNumber}
                      onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                      className="apple-input w-full"
                      maxLength={10}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Department *</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="apple-input w-full"
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Role *</label>
                    <input
                      type="text"
                      value={formData.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                      className="apple-input w-full"
                      placeholder="e.g., Chapter Lead, Technical Head"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">GitHub Link *</label>
                    <input
                      type="url"
                      value={formData.githubLink}
                      onChange={(e) => handleInputChange('githubLink', e.target.value)}
                      className="apple-input w-full"
                      placeholder="https://github.com/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">LinkedIn Link *</label>
                    <input
                      type="url"
                      value={formData.linkedinLink}
                      onChange={(e) => handleInputChange('linkedinLink', e.target.value)}
                      className="apple-input w-full"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Resume Link *</label>
                    <input
                      type="url"
                      value={formData.resumeLink}
                      onChange={(e) => handleInputChange('resumeLink', e.target.value)}
                      className="apple-input w-full"
                      placeholder="Link to your resume"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Portfolio Link *</label>
                    <input
                      type="url"
                      value={formData.portfolioLink}
                      onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                      className="apple-input w-full"
                      placeholder="Link to your portfolio"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Skills *</label>
                    <input
                      type="text"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      className="apple-input w-full"
                      placeholder="Comma-separated skills (e.g., React, Python, UI/UX)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Profile Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="apple-input w-full"
                    />
                    {formData.imageFile && (
                      <div className="mt-2">
                        <p className="text-sm text-apple-gray-600 mb-2">Selected: {formData.imageFile.name}</p>
                        {imagePreview && (
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="max-w-xs max-h-48 object-cover rounded border"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2 text-apple-gray-900 dark:text-white">Short Bio *</label>
                    <textarea
                      value={formData.shortBio}
                      onChange={(e) => handleInputChange('shortBio', e.target.value)}
                      className="apple-input w-full"
                      rows={4}
                      placeholder="Brief description about yourself..."
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full apple-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Registering...' : 'Register Profile'}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistration;
