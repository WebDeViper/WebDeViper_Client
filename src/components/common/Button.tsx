import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type Color = 'primary' | 'blue' | 'red' | 'white';
type Size = 'sm' | 'md' | 'full';
type Type = 'button' | 'submit';

interface ButtonProps {
  children: ReactNode;
  onClick?: (e?: any) => void;
  color?: Color;
  size?: Size;
  type?: Type;
  className?: string;
}

export function Button({
  children,
  onClick,
  color = 'primary',
  type = 'button',
  size = 'md',
  className = '',
}: ButtonProps) {
  return (
    <button
      className={`${buttonTheme.color[color]} ${buttonTheme.size[size]} align-middle text-center rounded-md font-semibold uppercase transition-all active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

const buttonTheme = {
  color: {
    primary: 'text-white bg-primary-500 shadow-primary-500/20 hover:shadow-primary-500/40 hover:shadow-lg shadow-md',
    blue: 'text-white bg-indigo-500 shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:shadow-lg shadow-md',
    red: 'text-white bg-red-500 shadow-red-500/20 hover:shadow-red-500/40 hover:shadow-lg shadow-md',
    white: 'text-gray-900 bg-white-500 shadow-white-500/20 hover:shadow-white-500/40 hover:shadow-lg shadow-md',
  },

  size: {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-3 py-2 text-base',
    full: 'py-2 w-full text-base',
  },
};

interface MotionButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export function MotionButton({ children, onClick }: MotionButtonProps) {
  return (
    <motion.button
      className="bg-primary-400 rounded-md px-6 py-3 text-white font-bold text-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
