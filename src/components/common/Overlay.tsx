import { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Overlay({ isOpen, children, setIsOpen }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setIsOpen]);
  return (
    isOpen && (
      <div className="absolute right-0 shadow-lg rounded-md bg-white mt-12 -top-1 py-1 w-fit z-10" ref={ref}>
        {children}
      </div>
    )
  );
}
