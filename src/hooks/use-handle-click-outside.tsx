import { useEffect, useRef } from 'react';

const useHandleClickOutside = (onClickOutside: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => removeEventListener('mousedown', handleClickOutside);
  }, []);

  return ref;
};

export default useHandleClickOutside;
