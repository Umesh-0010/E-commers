import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

function Hero() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="hidden md:flex justify-center w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        speed={800}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="w-full h-125"
        onAutoplayTimeLeft={onAutoplayTimeLeft}
      >
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain" src="/images/img1.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain mt-5" src="/images/img2.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain ml-8" src="/images/img3.webp" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain mt-28 ml-14" src="/images/img4.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain mt-28 ml-14" src="/images/img5.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain mt-28 ml-14" src="/images/img6.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain mt-28 ml-14" src="/images/img7.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain mt-28 ml-14" src="/images/img8.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain mt-28 ml-14" src="/images/img9.png" alt="Products" />
        </SwiperSlide>
        <SwiperSlide className="flex items-center justify-center rounded-xl">
          <img className="max-w-full max-h-full object-contain" src="/images/img10.png" alt="Products" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Hero;