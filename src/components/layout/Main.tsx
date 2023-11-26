import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <div className="flex-1">
      <main className="overflow-hidden">{children}</main>
    </div>
  );
}
