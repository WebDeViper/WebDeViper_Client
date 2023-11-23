import { useState, useRef, useEffect, useCallback } from 'react';

type UseSelectReturn = [isOpen: boolean, selectRef: React.RefObject<HTMLDivElement>, toggleOpen: () => void];

export default function useModalToggle(): UseSelectReturn {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen]);

  return [isOpen, selectRef, toggleOpen];
}
