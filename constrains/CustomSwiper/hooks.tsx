import { useState, useEffect } from "react";

const useDrags = ({
  prevSlide,
  nextSlide,
}: {
  prevSlide: () => void;
  nextSlide: () => void;
}) => {
  const rule1 = 280;
  const rule2 = 180;
  const [translateXOffSet, setTranslateXOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    document.addEventListener("mouseleave", handleDragEnd);
    return () => {
      document.removeEventListener("mouseleave", handleDragEnd);
    };
  }, []);
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    setTranslateXOffset(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!dragging) return;
    setDragging(false);
    let offsetTimes = 0;
    if (translateXOffSet < 0) {
      offsetTimes = Math.floor(Math.abs(translateXOffSet) / rule1);
    } else {
      offsetTimes = Math.floor(Math.abs(translateXOffSet) / rule2);
    }
    if (offsetTimes >= 1) {
      if (translateXOffSet > 0) {
        prevSlide();
      } else if (translateXOffSet <= 0) {
        nextSlide();
      }
    }

    setTranslateXOffset(0);
  };
  return { handleDragStart, handleDragMove, handleDragEnd, translateXOffSet };
};

const useMove = () => {
  const images = [
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
    "/aqib-talib-image.png",
  ];

  const offsetLeft = 65; //need to adjust in different px // can add a monitor
  const offsetRight = 35; //need to adjust in different px

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(
    images.map((_, index) => {
      return index * offsetLeft;
    })
  );
  const nextSlide = () => {
    if (currentIndex < images.length - 1) {
      const nIndex = currentIndex + 1;
      const nX = translateX.map((_, index) => {
        if (index < nIndex) {
          // const offset = nIndex - index;
          return _ - offsetRight;
        } else {
          // const offset = index - nIndex;
          return _ - offsetLeft;
        }
      });
      setTranslateX(nX);
    }
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  // 上一张
  const prevSlide = () => {
    if (currentIndex > 0) {
      const nIndex = currentIndex - 1;
      const nX = translateX.map((_, index) => {
        if (index <= nIndex) {
          // const offset = nIndex - index;
          return _ + offsetRight;
        } else {
          // const offset = index - nIndex;
          return _ + offsetLeft;
        }
      });
      setTranslateX(nX);
      setCurrentIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };
  return { nextSlide, prevSlide, translateX, currentIndex, images };
};

export { useDrags, useMove };
