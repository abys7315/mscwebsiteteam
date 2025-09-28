import React from 'react';
import { motion } from 'framer-motion';
import StarryBackground from '../components/StarryBackground';

const Gallery = () => {
  const images = [
    {
      url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
      title: "Azure Workshop 2023",
      description: "Students learning about cloud computing"
    },
    {
      url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1000&auto=format&fit=crop",
      title: "Hackathon Winners",
      description: "Team presenting their innovative solution"
    },
    {
      url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop",
      title: "Tech Talk Series",
      description: "Industry experts sharing insights"
    },
    {
      url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000&auto=format&fit=crop",
      title: "Community Meetup",
      description: "Networking and knowledge sharing"
    },
    {
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
      title: "Team Building Activity",
      description: "Chapter members collaborating"
    },
    {
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1000&auto=format&fit=crop",
      title: "Code Camp 2023",
      description: "Intensive coding workshop"
    }
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
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 apple-text-gradient">
          Event Gallery
        </h1>
        <p className="text-lg text-apple-gray-600 dark:text-apple-gray-300 max-w-2xl mx-auto">
          Capturing moments of learning, innovation, and community building at Microsoft Student Chapter VIT-AP.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="apple-card group relative overflow-hidden"
          >
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Content overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {image.title}
                  </h3>
                  <p className="text-sm text-apple-gray-300">
                    {image.description}
                  </p>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-apple-blue via-purple-500 to-apple-blue" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;