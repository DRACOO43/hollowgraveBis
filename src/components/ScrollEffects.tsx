import React from 'react';
import { motion, useScroll, useSpring, useTransform, Variants } from 'motion/react';

// Top Glowing Progress Bar with spring physics
export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none">
      <motion.div
        style={{ scaleX }}
        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 origin-left shadow-[0_0_10px_rgba(168,85,247,0.8)]"
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
  const x = useTransform(scrollY, [0, 3000], [0, -300 * (baseVelocity / 2)]);

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

// Lightweight Sequential Stagger Entrance Container & Items
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
  staggerDelay = 0.08,
  delayChildren = 0.02,
  viewportAmount = 0.1,
  once = true
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
          hidden: { opacity: 0, scale: 0.95 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.35, ease: 'easeOut' }
          }
        };
      case 'slide-in':
        return {
          hidden: { opacity: 0, x: -20 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.35, ease: 'easeOut' }
          }
        };
      case 'flip-x':
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: 'easeOut' }
          }
        };
      case 'fade-up':
      default:
        return {
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.35, ease: 'easeOut' }
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

// Flexible Directional Scroll Reveal Wrapper
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
  delay = 0,
  duration = 0.35,
  className = '',
  once = true
}) => {
  const variants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-30px' }}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Lightweight Static Background Glows (no laggy filter blurs or infinite loops on scroll)
export const ScrollFloatingGlows: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Top Left Gradient Spot */}
      <div className="absolute top-[-10%] left-[-10%] w-[36rem] h-[36rem] bg-gradient-to-tr from-purple-900/20 via-indigo-800/15 to-transparent rounded-full opacity-60 pointer-events-none" />

      {/* Top Right Gradient Spot */}
      <div className="absolute top-[20%] right-[-10%] w-[38rem] h-[38rem] bg-gradient-to-br from-indigo-800/20 via-purple-900/15 to-transparent rounded-full opacity-60 pointer-events-none" />

      {/* Bottom Gradient Spot */}
      <div className="absolute bottom-[-10%] right-[10%] w-[32rem] h-[32rem] bg-gradient-to-tl from-purple-900/20 via-indigo-900/15 to-transparent rounded-full opacity-60 pointer-events-none" />
    </div>
  );
};
