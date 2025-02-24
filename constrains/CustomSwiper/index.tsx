"use client";
import { useState } from "react";
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
  const offsetRight = 48;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(
    images.map((_, index) => {
      return index * offsetLeft;
    })
  );

  const calStyles = (index: number) => {
    const x = translateX[index];
    return {
      transform: `translateX(${x}vw)`,
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
        <div className={styles.swiperWrapper}>
          {images.map((_, index) => (
            <div
              key={index}
              className={`${styles.swiperSlide} ${
                index === currentIndex ? styles.active : ""
              }`}
              style={{
                ...calStyles(index),
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
