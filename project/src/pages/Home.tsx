import React from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, animate } from 'framer-motion';
import { ArrowRight, Users, Calendar, Award, MapPin, Clock, ChevronRight, Play, Info, Star, Zap, Trophy, Gauge, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView as useInViewHook } from 'react-intersection-observer';
import { useEffect } from 'react';
import AlphabetDrawing from '../components/AnimatedText';
import BayWindowSlider from '../components/BayWindowSlider';
import StarryBackground from '../components/StarryBackground';

const Home = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.95]);

  const [featuresRef, featuresInView] = useInViewHook({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '100px 0px'
  });

  const [statsRef, statsInView] = useInViewHook({
    triggerOnce: true,
    threshold: 0.05,
    rootMargin: '100px 0px'
  });

  const features = [
    {
      icon: Zap,
      title: "Innovation First",
      description: "Cutting-edge Microsoft technologies and development practices",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
      color: "#007AFF"
    },
    {
      icon: Trophy,
      title: "Excellence Driven",
      description: "Premium workshops, hackathons, and technical excellence",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
      color: "#5856D6"
    },
    {
      icon: Users,
      title: "Community Focused",
      description: "Building connections with industry leaders and peers",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      color: "#007AFF"
    }
  ];

  const stats = [
    { number: 500, suffix: "+", label: "Active Members", icon: Users, color: "#007AFF" },
    { number: 50, suffix: "+", label: "Events Hosted", icon: Calendar, color: "#5856D6" },
    { number: 100, suffix: "+", label: "Projects Completed", icon: Award, color: "#007AFF" },
    { number: 25, suffix: "+", label: "Industry Partners", icon: Star, color: "#5856D6" }
  ];

  // Animated Counter Component
  const AnimatedCounter = ({ value, suffix = "", inView }: { value: number; suffix?: string; inView: boolean }) => {
    const count = useMotionValue(0);
    const rounded = useSpring(count, { damping: 50, stiffness: 100 });
    const [displayValue, setDisplayValue] = React.useState(0);

    useEffect(() => {
      const unsubscribe = rounded.on("change", (latest) => {
        setDisplayValue(Math.round(latest));
      });
      return unsubscribe;
    }, [rounded]);

    useEffect(() => {
      if (inView) {
        const controls = animate(count, value, {
          duration: 2,
          ease: "easeOut",
        });
        return controls.stop;
      }
    }, [count, value, inView]);

    return (
      <span>
        {displayValue}{suffix}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black relative">
      {/* Starry Background Throughout */}
      <div className="fixed inset-0 z-0">
        <StarryBackground />
      </div>
      
      {/* Apple-Style Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden z-10"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2000&auto=format&fit=crop"
            alt="Technology Background"
            className="w-full h-full object-cover opacity-20 dark:opacity-5"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* Apple-Style Logo */}
          <motion.div 
            className="mb-16 flex justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              type: "spring", 
              stiffness: 100, 
              damping: 15,
              ease: [0.23, 1, 0.32, 1]
            }}
          >
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-apple-blue to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img
                src="/msc-logo.png"
                alt="MSC Logo"
                className="w-24 h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 object-contain apple-floating relative z-10"
                style={{ filter: 'drop-shadow(0 0 20px rgba(0, 122, 255, 0.3))' }}
              />
            </div>
          </motion.div>

          {/* Apple-Style Title */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="text-center mb-8"
          >
            <div className="mb-8 flex items-center justify-center min-h-[30vh]">
              <div className="flex justify-center w-full">
                <AlphabetDrawing />
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-20 bg-gradient-to-r from-apple-blue to-transparent"></div>
              <Zap className="w-6 h-6 text-apple-blue" />
              <div className="h-px w-20 bg-gradient-to-l from-purple-500 to-transparent"></div>
            </div>
            <p className="text-xl md:text-2xl text-apple-gray-600 dark:text-apple-gray-300 leading-relaxed max-w-4xl mx-auto font-normal">
              Empowering students through Microsoft technologies and innovation
            </p>
          </motion.div>

          {/* Apple-Style Buttons */}
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link to="/team">
              <motion.button
                className="apple-button-secondary px-8 py-4 text-lg flex items-center gap-3"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <Users className="w-5 h-5" />
                View Team
              </motion.button>
            </Link>

            <Link to="/team-registration">
              <motion.button
                className="apple-button-secondary px-8 py-4 text-lg flex items-center gap-3"
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1] }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
              >
                <User className="w-5 h-5" />
                Register Team
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.section>






    </div>
  );
};

export default Home;