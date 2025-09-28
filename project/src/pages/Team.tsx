import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Calendar, Megaphone, Palette, PenTool, Cpu, TrendingUp, FileText, MessageSquare, Lightbulb, Play } from 'lucide-react';
import StarryBackground from '../components/StarryBackground';

interface TeamMember {
  _id: string;
  name: string;
  regNumber: string;
  email: string;
  contactNumber: string;
  role: string;
  imagePath: string;
  department: string;
  shortBio?: string;
  githubLink?: string;
  linkedinLink?: string;
  resumeLink?: string;
  portfolioLink?: string;
  skills?: string[];
}

const departmentIcons: { [key: string]: React.ComponentType<{ className?: string }> } = {
  'Admin Department': Users,
  'Technical Team': Code,
  'Hi-Tech Team': Cpu,
  'Marketing Team': TrendingUp,
  'Design/Creative Team': Palette,
  'Documentation Team': FileText,
  'Event Management Team': Calendar,
  'Outreach Team': Megaphone,
  'Public Relations Team': MessageSquare,
  'Programs Team': Play,
  'Research and Development Team': Lightbulb,
};

const departmentColors: { [key: string]: string } = {
  'Admin Department': '#007AFF',
  'Technical Team': '#5856D6',
  'Hi-Tech Team': '#FF3B30',
  'Marketing Team': '#FF9500',
  'Design/Creative Team': '#FF2D55',
  'Documentation Team': '#8E8E93',
  'Event Management Team': '#34C759',
  'Outreach Team': '#FF9500',
  'Public Relations Team': '#AF52DE',
  'Programs Team': '#5AC8FA',
  'Research and Development Team': '#FFCC00',
};

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001/api';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(`${API_BASE}/team-members`);
        if (response.ok) {
          const data = await response.json();
          setTeamMembers(data.data);
        } else {
          setError('Failed to load team members');
        }
      } catch (err) {
        setError('Network error loading team members');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Group by department
  const groupedMembers = teamMembers.reduce((acc, member) => {
    if (!acc[member.department]) acc[member.department] = [];
    acc[member.department].push(member);
    return acc;
  }, {} as { [key: string]: TeamMember[] });

  const departments = Object.keys(groupedMembers).map(dept => ({
    name: dept,
    icon: departmentIcons[dept] || Users,
    color: departmentColors[dept] || '#007AFF',
    members: groupedMembers[dept]
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black relative flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-apple-blue mx-auto mb-4"></div>
          <p className="text-apple-gray-600 dark:text-apple-gray-300">Loading team members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-black relative flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="apple-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="absolute inset-0 bg-black/20 -mx-4"></div>

        <div className="relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
              Our Team
            </h1>
            <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
              Meet the passionate individuals driving innovation at Microsoft Student Chapter
            </p>
          </motion.div>

          <div className="space-y-16">
            {departments.map((department, deptIndex) => (
              <motion.div
                key={department.name}
                initial={{ y: 60, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "100px 0px" }}
                transition={{ duration: 0.8, delay: deptIndex * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="apple-card"
              >
                {/* Department Header */}
                <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-apple-blue/10 to-apple-purple/10 rounded-t-2xl">
                  <span style={{ color: department.color }}>
                    <department.icon className="w-10 h-10" />
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: department.color }}>
                      {department.name}
                    </h2>
                    <p className="text-apple-gray-600 dark:text-apple-gray-300">
                      {department.members.length} {department.members.length === 1 ? 'member' : 'members'}
                    </p>
                  </div>
                </div>

                {/* Members Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                  {department.members.map((member, index) => (
                    <motion.div
                      key={member._id}
                      initial={{ y: 40, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.6, 
                        delay: index * 0.1,
                        ease: [0.23, 1, 0.32, 1] 
                      }}
                      className="group relative overflow-hidden rounded-2xl apple-card p-6 hover:shadow-2xl transition-all duration-300"
                      onMouseEnter={() => setSelectedMember(member)}
                    >
                      {/* Member Image */}
                      <div className="relative mb-4">
                        <img
                          src={member.imagePath || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'}
                          alt={member.name}
                          className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white/20 group-hover:border-apple-blue transition-colors"
                        />
                      </div>

                      {/* Member Info */}
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-apple-gray-900 dark:text-white mb-2 group-hover:text-apple-blue transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-apple-gray-600 dark:text-apple-gray-300 text-sm mb-4">
                          {member.role}
                        </p>

                        {member.shortBio && (
                          <p className="text-apple-gray-500 dark:text-apple-gray-400 text-sm mb-4 italic">
                            "{member.shortBio}"
                          </p>
                        )}

                        {/* Skills */}
                        {member.skills && member.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2 justify-center mb-4">
                            {member.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span
                                key={skillIndex}
                                className="px-2 py-1 bg-apple-blue/10 text-apple-blue text-xs rounded-full"
                              >
                                {skill}
                              </span>
                            ))}
                            {member.skills.length > 3 && (
                              <span className="px-2 py-1 bg-apple-gray-100 dark:bg-apple-gray-800 text-apple-gray-500 text-xs rounded-full">
                                +{member.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Social Links */}
                        <div className="flex gap-3 justify-center">
                          {member.githubLink && (
                            <a
                              href={member.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 flex items-center justify-center hover:bg-apple-blue transition-colors"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                          {member.linkedinLink && (
                            <a
                              href={member.linkedinLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-apple-gray-100 dark:bg-apple-gray-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                            >
                              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>


                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Member Detail Modal */}
            {selectedMember && (
              <div className="absolute top-1/2 left-1/2 z-[100] -translate-x-1/2 -translate-y-1/2 p-4" onClick={() => setSelectedMember(null)}>
                <div className="bg-white dark:bg-black rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto apple-card shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 text-apple-gray-500 hover:text-apple-gray-700 dark:hover:text-white p-2 rounded-full hover:bg-apple-gray-100 dark:hover:bg-apple-gray-800 transition-colors z-10"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Top Section: Image and Basic Info */}
                  <div className="flex flex-col lg:flex-row gap-8 mb-8">
                    {/* Left: Image */}
                    <div className="flex-shrink-0 text-center lg:text-left">
                      <img
                        src={selectedMember.imagePath || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'}
                        alt={selectedMember.name}
                        className="w-48 h-48 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-apple-blue/20 shadow-lg mx-auto lg:mx-0"
                      />
                      <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                        <span style={{ color: departmentColors[selectedMember.department] || '#007AFF' }}>
                          {React.createElement(departmentIcons[selectedMember.department] || Users, { className: "w-6 h-6" })}
                        </span>
                        <span className="text-lg font-semibold" style={{ color: departmentColors[selectedMember.department] || '#007AFF' }}>
                          {selectedMember.department}
                        </span>
                      </div>
                    </div>

                    {/* Right: Basic Info */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-4xl lg:text-5xl font-bold text-apple-gray-900 dark:text-white mb-4 text-center lg:text-left">
                        {selectedMember.name}
                      </h2>
                      <p className="text-2xl text-apple-blue mb-6 text-center lg:text-left">
                        {selectedMember.role}
                      </p>
                      <div className="space-y-3 text-apple-gray-700 dark:text-apple-gray-300 text-center lg:text-left">
                        <p><span className="font-semibold">Registration Number:</span> {selectedMember.regNumber}</p>
                        <p><span className="font-semibold">Email:</span> {selectedMember.email}</p>
                        <p><span className="font-semibold">Contact:</span> {selectedMember.contactNumber}</p>
                      </div>
                    </div>
                  </div>

                  {/* Skills and Bio Section */}
                  <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    {/* Skills */}
                    {selectedMember.skills && selectedMember.skills.length > 0 && (
                      <div className="apple-card p-6">
                        <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                          Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-gradient-to-r from-apple-blue to-apple-purple/20 text-apple-blue text-sm rounded-full font-medium shadow-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Short Bio */}
                    {selectedMember.shortBio && (
                      <div className="apple-card p-6">
                        <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-4">
                          About Me
                        </h3>
                        <p className="text-apple-gray-700 dark:text-apple-gray-300 italic leading-relaxed">
                          "{selectedMember.shortBio}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Additional Links */}
                  {(selectedMember.resumeLink || selectedMember.portfolioLink) && (
                    <div className="mb-8 apple-card p-6">
                      <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-4 text-center">
                        Additional Resources
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        {selectedMember.resumeLink && (
                          <a
                            href={selectedMember.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-apple-blue to-apple-purple text-white rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                          >
                            📄 View Resume
                          </a>
                        )}
                        {selectedMember.portfolioLink && (
                          <a
                            href={selectedMember.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-apple-purple to-apple-blue text-white rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-center"
                          >
                            💼 View Portfolio
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  {(selectedMember.githubLink || selectedMember.linkedinLink) && (
                    <div className="apple-card p-6">
                      <h3 className="text-xl font-semibold text-apple-gray-900 dark:text-white mb-6 text-center">
                        Let's Connect
                      </h3>
                      <div className="flex gap-6 justify-center">
                        {selectedMember.githubLink && (
                          <a
                            href={selectedMember.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center hover:from-apple-blue hover:to-apple-purple shadow-lg transform hover:scale-110 transition-all duration-300"
                          >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {selectedMember.linkedinLink && (
                          <a
                            href={selectedMember.linkedinLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-110 transition-all duration-300"
                          >
                            <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Team Stats */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "100px 0px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            className="mt-20"
          >
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                { number: teamMembers.length.toString(), label: "Team Members", color: "#007AFF" },
                { number: departments.length.toString(), label: "Departments", color: "#5856D6" },
                { number: "50+", label: "Events Organized", color: "#34C759" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ y: 40, opacity: 0, scale: 0.9 }}
                  whileInView={{ y: 0, opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    ease: [0.23, 1, 0.32, 1] 
                  }}
                  className="apple-card p-8"
                >
                  <div 
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-apple-gray-600 dark:text-apple-gray-300 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Team;
