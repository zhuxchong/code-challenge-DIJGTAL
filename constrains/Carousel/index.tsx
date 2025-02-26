"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useState } from "react";
import "./styles.css";
import Image from "next/image";
import Icon from "@/public/“.png";
import type { Swiper as SwiperType } from "swiper";
import Card from "@/components/PersonCard";
import Bkg from "@/components/BkgTrapezoid";

const PrecisionSwiper = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef<SwiperType>(null);
  const [, setProgress] = useState(0);

  const [idx, setIdx] = useState(0);
  const imageList = new Array(15).fill(null);

  // 初始化导航按钮
  const handleSwiperInit = (swiper: any) => {
    swiperRef.current = swiper;
    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  };

  // 安全获取缩放值
  const getScaleValue = (index: number) => {
    if (!swiperRef.current) {
      if (index === idx) {
        return 1;
      }
      return 0.7; // 其他项
    }

    const realIndex = swiperRef.current.realIndex;
    const slidesCount = swiperRef.current.slides.length;

    console.log(realIndex, slidesCount, index, "xxx");

    if (index == realIndex) {
      return 1;
    }
    return 0.7; // 其他项
  };

  return (
    <div className="constrains-Carousel-swiper-container1">
      <Bkg></Bkg>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        speed={500}
        slidesPerView={2}
        spaceBetween={100}
        loop={false} // 关闭循环模式
        centeredSlides
        watchSlidesProgress
        onProgress={(swiper) => setProgress(swiper.progress)}
        onSwiper={handleSwiperInit}
        onSlideChange={(swiper) => {
          setIdx(swiper.realIndex);
        }}
        breakpoints={{
          0: { slidesPerView: 1 }, // 0 - 767px 之间：1个 Slide
          768: { slidesPerView: 2 }, // 768px 及以上：3个 Slide
        }}
      >
        {imageList.map((item, i) => (
          <SwiperSlide key={`${item}_${i}`}>
            <div
              className="constrains-Carousel-slide-content"
              style={{
                transform: `scale(${getScaleValue(i)})`,
              }}
            >
              <div className="constrains-Carousel-slide-inner">
                <Card index={i} />
                {idx === i && (
                  <div className="constrains-Carousel-description">
                    <Image
                      src={Icon}
                      alt={`Icon ${i + 1}`}
                      className="constrains-Carousel-icon"
                    />
                    Lorem ipsum dolor sit amet consectetur. Placerat interdum
                    mollis dui vitae.
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div ref={prevRef} className="constrains-Carousel-custom-prev" />
        <div ref={nextRef} className="constrains-Carousel-custom-next" />
      </Swiper>
    </div>
  );
};

export default PrecisionSwiper;
