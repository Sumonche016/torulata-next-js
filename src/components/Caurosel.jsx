"use client";
import { useEffect, useState, useCallback } from "react";

const Carousel = ({ children: slides }) => {
  const [curr, setCurr] = useState(0);
  const [clickChange, setClickChange] = useState(false);

  const next = useCallback(() => {
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  }, [slides.length]);

  const [reSlide, setReSlide] = useState(true);

  useEffect(() => {
    if (slides.length > 0) {
      const slideInterval = setInterval(next, 3000);
      return () => clearInterval(slideInterval);
    }
    if (slides.length === 0 && !reSlide) {
      setReSlide(true);
    }
  }, [clickChange, next, reSlide, slides.length]);

  const changeSliderImage = (i) => {
    setCurr(i);
    setClickChange(!clickChange);
  };

  if (slides.length === 0) {
    return <div>loading</div>;
  }

  return (
    <div className="overflow-hidden relative">
      <div className="h-full max-h-[428px] rounded-md overflow-hidden">
        <div
          className="flex h-full max-h-[428px] transition-transform ease-out duration-500 "
          style={{ transform: `translateX(-${curr * 100}%)` }}
        >
          {slides}
        </div>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className="flex items-center justify-center gap-2">
          {slides?.map((_, i) => (
            <div
              key={i}
              onClick={() => changeSliderImage(i)}
              className={`
                transition-all w-1.5 md:w-3 h-1.5 md:h-3 bg-white rounded-full
                cursor-pointer
                ${curr === i ? "p-1 md:p-2" : "bg-opacity-50"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
