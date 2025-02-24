"use client";
import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Card from "@/components/PersonCard";
import Bkg from "@/components/BkgTrapezoid";
import Summary from "@/components/Summary";
export default function CustomSwiper() {
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

  const offsetLeft = 64;
  const offsetRight = 40;
  const rule1 = 280;
  const rule2 = 180;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(
    images.map((_, index) => {
      return index * offsetLeft;
    })
  );
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

  // const nextSlide1 = (times: number) => {
  //   const maxTimes = images.length - 1 - currentIndex;
  //   const t = times > maxTimes ? maxTimes : times;
  //   const nIndex = currentIndex + 1;
  //   const nX = translateX.map((_, index) => {
  //     if (index < nIndex) {
  //       // const offset = nIndex - index;
  //       return _ - offsetRight * t;
  //     } else {
  //       // const offset = index - nIndex;
  //       return _ - offsetLeft * t;
  //     }
  //   });

  //   setTranslateX(nX);
  //   setCurrentIndex(currentIndex + t);
  // };

  // // 上一张
  // const prevSlide1 = (times: number) => {
  //   const t = times > currentIndex ? currentIndex : times;
  //   const nIndex = currentIndex - 1;
  //   const nX = translateX.map((_, index) => {
  //     if (index <= nIndex) {
  //       // const offset = nIndex - index;
  //       return _ + offsetRight * t;
  //     } else {
  //       // const offset = index - nIndex;
  //       return _ + offsetLeft * t;
  //     }
  //   });

  //   setTranslateX(nX);
  //   setCurrentIndex(currentIndex - t);
  // };

  const calStyles = (index: number) => {
    const x = translateX[index];
    return {
      transform: `translateX(calc(${x}vw + ${translateXOffSet}px))`,
    };
  };

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

  return (
    <div className={styles.swiper}>
      <Bkg></Bkg>
      <div className={styles.swiperContainer}>
        <div
          className={styles.swiperWrapper}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
        >
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.swiperSlide} ${
                index === currentIndex ? styles.active : ""
              }`}
              style={{
                ...calStyles(index),
                transition:
                  translateXOffSet === 0
                    ? "transform 0.5s ease-in-out"
                    : "none",
              }}
            >
              <Card />
              {index === currentIndex && <Summary i={index} />}
            </div>
          ))}
        </div>
      </div>
      {/* 左右按钮 */}
      <button className={styles.prevButton} onClick={prevSlide}>
        ←
      </button>
      <button className={styles.nextButton} onClick={nextSlide}>
        →
      </button>
    </div>
  );
}
