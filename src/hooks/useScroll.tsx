import { useState, useEffect } from 'react';

export const useScroll = () => {
  const [scrollY, setScrollY] = useState<number>(0);

  // 마우스 휠로 페이지 이동.
  const handleScroll = (e : WheelEvent) => {
    const deltaY = e.deltaY;
    if(deltaY > 0){ // 스크롤을 아래로 했을 경우.
      if(scrollY >= 100) return; // 현재는 페이지가 2개뿐이기 때문.
      
      setScrollY((prev) => prev + deltaY);
    } else if(deltaY < 0) { // 스크롤을 위로 했을 경우.
      setScrollY((prev) => prev + deltaY);
    }
  };

  // 방향키로 페이지 이동
  const handelScrollByArrowKeys = (e : KeyboardEvent) => {
    const arrowKey = e.key;
    if(arrowKey === "ArrowDown" && scrollY < 100){
      setScrollY((prev) => prev + 100);
    } else if(arrowKey === 'ArrowUp'){
      if(scrollY > 0){
        setScrollY((prev) => prev - 100);
      }
      
    }
  }

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handelScrollByArrowKeys);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handelScrollByArrowKeys);
    };
  });

  return {
    scrollY
  };
}