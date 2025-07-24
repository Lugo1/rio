import React from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-6 py-3 font-semibold rounded-xl shadow-md transition-colors duration-300';

  const variants = {
    primary: 'bg-teal-500 hover:bg-teal-400 text-white',
    outline: 'border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white',
    ghost: 'text-gray-600 hover:text-teal-500',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={twMerge(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
