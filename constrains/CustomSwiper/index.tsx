"use client";
import styles from "./styles.module.css";
import Card from "@/components/PersonCard";
import Bkg from "@/components/BkgTrapezoid";
import Summary from "@/components/Summary";
import { useDrags, useMove } from "./hooks";
export default function CustomSwiper() {
  const { nextSlide, prevSlide, translateX, currentIndex, images } = useMove();
  const { handleDragStart, handleDragMove, handleDragEnd, translateXOffSet } =
    useDrags({
      prevSlide,
      nextSlide,
    });
  const calStyles = (index: number) => {
    const x = translateX[index];
    return {
      transform: `translateX(calc(${x}vw + ${translateXOffSet}px))`,
    };
  };
  return (
    <div className={styles.swiper} id="carouselWrapper">
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
              <Card index={index} />
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
