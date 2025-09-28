import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';
import StarryBackground from '../components/StarryBackground';

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    regNo: '',
    branch: '',
    year: '',
    interests: [],
    experience: '',
    motivation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    toast.success('Application submitted successfully! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      regNo: '',
      branch: '',
      year: '',
      interests: [],
      experience: '',
      motivation: ''
    });
  };

  const interests = [
    "Web Development",
    "Cloud Computing",
    "Artificial Intelligence",
    "Machine Learning",
    "Cybersecurity",
    "IoT",
    "Mobile Development",
    "UI/UX Design"
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Section Background Overlay */}
        <div className="absolute inset-0 bg-black/20 -mx-4"></div>
        
        <div className="relative z-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
            Join Microsoft Student Chapter
          </h1>
          <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300">
            Be part of an innovative community of tech enthusiasts and future leaders.
          </p>
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="apple-card p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="apple-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="apple-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="apple-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Registration Number</label>
                <input
                  type="text"
                  value={formData.regNo}
                  onChange={(e) => setFormData({...formData, regNo: e.target.value})}
                  className="apple-input w-full"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Branch</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  className="apple-input w-full"
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="CSE">Computer Science</option>
                  <option value="ECE">Electronics</option>
                  <option value="MECH">Mechanical</option>
                  <option value="CIVIL">Civil</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Year</label>
                <select
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="apple-input w-full"
                  required
                >
                  <option value="">Select Year</option>
                  <option value="1">First Year</option>
                  <option value="2">Second Year</option>
                  <option value="3">Third Year</option>
                  <option value="4">Fourth Year</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Areas of Interest</label>
              <div className="grid md:grid-cols-2 gap-4">
                {interests.map((interest) => (
                  <label key={interest} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={(e) => {
                        const newInterests = e.target.checked
                          ? [...formData.interests, interest]
                          : formData.interests.filter(i => i !== interest);
                        setFormData({...formData, interests: newInterests});
                      }}
                      className="form-checkbox text-apple-blue"
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Technical Experience</label>
              <textarea
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="apple-input w-full"
                rows={4}
                placeholder="Tell us about your technical experience and projects..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Why do you want to join MSC?</label>
              <textarea
                value={formData.motivation}
                onChange={(e) => setFormData({...formData, motivation: e.target.value})}
                className="apple-input w-full"
                rows={4}
                placeholder="Share your motivation for joining Microsoft Student Chapter..."
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full apple-button flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Submit Application
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;