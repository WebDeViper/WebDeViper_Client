import { ReactNode } from 'react';

type Color = 'primary' | 'blue';
type Size = 'sm' | 'md' | 'full';
type Type = 'button' | 'submit';
interface Props {
  children: ReactNode;
  onClick?: () => void;
  color?: Color;
  size?: Size;
  type?: Type;
}

export function Button({ children, onClick, color = 'primary', type = 'button', size = 'md' }: Props) {
  return (
    <button
      className={`${buttonTheme.color[color]} ${buttonTheme.size[size]} align-middle text-center rounded-md font-semibold uppercase transition-all active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
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
    blue: 'bg-indigo-600 hover:bg-indigo-500 text-white',
  },

  size: {
    sm: 'px-2 py-1.5 text-sm',
    md: 'px-2.5 py-2 text-base',
    full: 'py-2 w-full text-base',
  },
};
