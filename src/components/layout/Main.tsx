import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <div className="flex-1 mt-5 mb-20">
      <main>{children}</main>
    </div>
  );
}
