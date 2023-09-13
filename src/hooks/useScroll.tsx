import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  const handleScroll = (e : WheelEvent) => {
    const deltaY = e.deltaY;
    if(deltaY > 0){ // 스크롤을 아래로 했을 경우.
      if(scrollY >= 100) return; // 현재는 페이지가 2개뿐이기 때문.
      
      setScrollY((prev) => prev + deltaY);
    } else if(deltaY < 0) { // 스크롤을 위로 했을 경우.
      setScrollY((prev) => prev + deltaY);
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  });

  return {
    scrollY
  };
}