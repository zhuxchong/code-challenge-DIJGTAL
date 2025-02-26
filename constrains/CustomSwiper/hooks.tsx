import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";

const useDrags = ({
  prevSlide,
  nextSlide,
}: {
  prevSlide: () => void;
  nextSlide: () => void;
}) => {
  const { width } = useWindowSize();

  const rule1 = width && width < 768 ? 100 : 280;
  const rule2 = width && width < 768 ? 100 : 180;
  const [translateXOffSet, setTranslateXOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const wrapper = document.getElementById("carouselWrapper");
    if (wrapper) {
      wrapper.addEventListener("mouseleave", _handleOnReset);
    }
    return () => {
      if (wrapper) {
        window.removeEventListener("mouseleave", _handleOnReset);
      }
    };
  }, []);

  const _handleOnReset = () => {
    setTranslateXOffset(0);
    setDragging(false);
  };

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const { offsetLeft, offsetRight, translateX, setTranslateX } =
    useHandleOnOffset({ images, currentIndex });
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

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{ width: number | undefined }>({
    width: undefined,
  });

  const handleResize = useCallback(
    debounce(() => {
      setWindowSize({
        width: window.innerWidth,
      });
    }, 300),
    []
  );

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();
    console.log("resize");

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [handleResize]);

  return windowSize;
};

const useHandleOnOffset = ({
  images,
  currentIndex,
}: {
  images: string[];
  currentIndex: number;
}) => {
  const paddingRightInit = 25;
  const { width } = useWindowSize();
  const [offset, setOffset] = useState([70, 41]);
  const [translateX, setTranslateX] = useState(
    images.map((_, index) => {
      return index * offset[0];
    })
  );

  const handleOnTranslateCalculation = ({
    cw,
    width,
    l,
    r,
  }: {
    cw: number;
    width: number;
    l: number;
    r: number;
  }) => {
    const rCorrectPosition = cw / 4;
    const lCorrectPosition = width - cw / 4;
    const lInVw = Math.round(((lCorrectPosition - l) / width) * 100);
    const rInVw = Math.round(((r - rCorrectPosition) / width) * 100);
    if (lInVw !== offset[0] || rInVw !== offset[1]) {
      const newOffset = images.map((_, index) => {
        const nIndex = index - currentIndex;
        if (nIndex < 0) {
          return nIndex * rInVw;
        } else if (index > 0) {
          return Math.abs(nIndex) * lInVw;
        }
        return 0;
      });
      setTranslateX(newOffset);
      setOffset([lInVw, rInVw]);
    }
  };

  useEffect(() => {
    const card = document.getElementById(`personCard${0}`);
    if (width) {
      if (width >= 1024) {
        if (card) {
          const cw = card.offsetWidth;
          const l = (paddingRightInit * width) / 100;
          const r = l + cw;
          handleOnTranslateCalculation({ cw, width, l, r });
        }
      } else {
        if (card) {
          const cw = card.offsetWidth;
          const l = width / 2 - cw / 2;
          const r = l + cw;
          handleOnTranslateCalculation({ cw, width, l, r });
        }
      }
    }
  }, [width, currentIndex]);
  return {
    offsetLeft: offset[0],
    offsetRight: offset[1],
    translateX,
    setTranslateX,
  };
};

export { useDrags, useMove };
