import { ReactNode } from 'react';

type Color = 'gray' | 'red' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink';
type Size = 'sm' | 'md';

interface Props {
  color: Color;
  children: ReactNode;
  size?: Size;
}

export default function Badge({ color, size = 'sm', children }: Props) {
  return <span className={`badge ${badgeTheme.color[color]} ${badgeTheme.size[size]}`}>{children}</span>;
}

const badgeTheme = {
  color: {
    gray: 'bg-gray-50 text-gray-600 ring-gray-500/10',
    red: 'bg-red-50 text-red-600 ring-red-600/10',
    yellow: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
    green: 'bg-green-50 text-green-700 ring-green-600/20',
    blue: 'bg-blue-50 text-blue-700 ring-blue-700/10',
    indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-700/10',
    purple: 'bg-purple-50 text-purple-700 ring-purple-700/10',
    pink: 'bg-pink-50 text-pink-700 ring-pink-700/10',
  },

  size: {
    sm: 'px-2 py-1 text-xs',
    md: 'px-2.5 py-1.5 text-sm',
  },
};
