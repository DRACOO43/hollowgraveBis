import React from 'react';
import { motion, useScroll, useSpring, useTransform, Variants } from 'motion/react';

// Top Glowing Progress Bar with spring physics
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-indigo-400 origin-left shadow-[0_0_15px_rgba(168,85,247,0.9)]"
      />
    </div>
  );
};

// Parallax Scroll Marquee Text
interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
}

export const ParallaxText: React.FC<ParallaxTextProps> = ({ children, baseVelocity = 2 }) => {
  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 4000], [0, -1000 * (baseVelocity / 2)]);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap py-4 select-none opacity-20 pointer-events-none">
      <motion.div style={{ x }} className="flex whitespace-nowrap font-black font-mono text-5xl sm:text-7xl uppercase tracking-widest text-transparent text-stroke">
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
        <span className="mr-8">{children}</span>
      </motion.div>
    </div>
  );
};

// Sequential Stagger Entrance Container & Items
interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  viewportAmount?: number;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.14,
  delayChildren = 0.05,
  viewportAmount = 0.15,
  once = false
}) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade-up' | 'scale-up' | 'slide-in' | 'flip-x';
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className = '',
  variant = 'fade-up'
}) => {
  const getVariants = (): Variants => {
    switch (variant) {
      case 'scale-up':
        return {
          hidden: { opacity: 0, scale: 0.82, y: 30 },
          visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'slide-in':
        return {
          hidden: { opacity: 0, x: -50, y: 20 },
          visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'flip-x':
        return {
          hidden: { opacity: 0, rotateY: -30, y: 40 },
          visible: {
            opacity: 1,
            rotateY: 0,
            y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
          }
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 50, scale: 0.95 },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
          }
        };
    }
  };

  return (
    <motion.div variants={getVariants()} className={className}>
      {children}
    </motion.div>
  );
};

// Flexible 3D / Directional Scroll Reveal Wrapper
type RevealVariant = 'fade-up' | 'zoom-3d' | 'flip-x' | 'slide-left' | 'slide-right' | 'elastic-scale';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  once = false
}) => {
  const getVariants = (): Variants => {
    switch (variant) {
      case 'zoom-3d':
        return {
          hidden: { opacity: 0, scale: 0.7, rotateX: 25, z: -100 },
          visible: { opacity: 1, scale: 1, rotateX: 0, z: 0 }
        };
      case 'flip-x':
        return {
          hidden: { opacity: 0, rotateY: -45, scale: 0.85 },
          visible: { opacity: 1, rotateY: 0, scale: 1 }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: -90, rotate: -2 },
          visible: { opacity: 1, x: 0, rotate: 0 }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: 90, rotate: 2 },
          visible: { opacity: 1, x: 0, rotate: 0 }
        };
      case 'elastic-scale':
        return {
          hidden: { opacity: 0, scale: 0.5 },
          visible: { opacity: 1, scale: 1 }
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 65, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      variants={getVariants()}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Dynamic Ambient Glow Spheres responding to scroll position with living depth
export const ScrollFloatingGlows: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth transforms linked to scroll progress
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 1000]);
  const x1 = useTransform(scrollYProgress, [0, 0.5, 1], [-50, 120, -30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -1200]);
  const x2 = useTransform(scrollYProgress, [0, 0.5, 1], [30, -150, 40]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, 800]);
  const x3 = useTransform(scrollYProgress, [0, 0.5, 1], [0, 200, -100]);
  
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.35, 1.1, 1.25]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 270]);
  const hueRotate = useTransform(scrollYProgress, [0, 0.5, 1], ['0deg', '45deg', '90deg']);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Deep Purple Blob */}
      <motion.div
        style={{ y: y1, x: x1, scale, rotate, filter: 'blur(140px)' }}
        animate={{
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[-10%] left-[-10%] w-[38rem] h-[38rem] bg-gradient-to-tr from-purple-900/30 via-indigo-800/20 to-purple-600/15 rounded-full"
      />

      {/* Top Right Neon Indigo Glow Blob */}
      <motion.div
        style={{ y: y2, x: x2, scale, rotate: useTransform(scrollYProgress, [0, 1], [360, 0]), filter: 'blur(160px)' }}
        animate={{
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] right-[-15%] w-[42rem] h-[42rem] bg-gradient-to-br from-indigo-700/25 via-purple-900/20 to-pink-600/15 rounded-full"
      />

      {/* Middle Center Floating Subtle Violet Orb */}
      <motion.div
        style={{ y: y3, x: x3, scale, filter: 'blur(170px)' }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 40, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[50%] left-[25%] w-[36rem] h-[36rem] bg-gradient-to-r from-violet-600/15 via-indigo-900/20 to-blue-900/15 rounded-full"
      />

      {/* Bottom Floating Glow Blob */}
      <motion.div
        style={{ 
          y: useTransform(scrollYProgress, [0, 1], [-200, 400]), 
          filter: 'blur(150px)',
          hueRotate 
        }}
        className="absolute bottom-[-10%] right-[10%] w-[32rem] h-[32rem] bg-gradient-to-tl from-purple-800/20 via-pink-700/15 to-indigo-800/20 rounded-full"
      />
    </div>
  );
};
