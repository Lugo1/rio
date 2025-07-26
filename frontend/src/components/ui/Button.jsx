// src/components/ui/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = `
    px-8 py-6 text-2xl font-semibold
    rounded-full shadow-lg tracking-wide
    transition-all duration-300 border
    inline-flex items-center justify-center
  `;

  const variants = {
    primary: `
      bg-[var(--color-primary)] 
      text-black 
      hover:bg-[var(--color-primary-hover)]
    `,
    outline: `
      border-2 
    border-[var(--color-primary)] 
    text-[var(--color-primary)] 
    hover:bg-[var(--color-bg-middle)] 
    hover:text-[var(--color-light)] 
    transition duration-300
    `,
    ghost: `
      bg-transparent 
      text-[var(--color-muted)] 
      hover:text-[var(--color-primary)] 
      border-transparent
    `,
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className={twMerge(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
