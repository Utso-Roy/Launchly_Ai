import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    image: "https://i.ibb.co/C3cR1PF3/pexels-pavel-danilyuk-8294616-1.jpg",
    title: "Discover Next-Gen Tech",
    subtitle: "Explore AI tools, web apps, and mobile innovations daily.",
  },
  {
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    title: "Launch Your Product Today",
    subtitle: "Showcase your innovations to a global community.",
  },
  {
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    title: "Stay Ahead in Technology",
    subtitle: "Follow top-rated tools and trending software launches.",
  },
];

const Slider = () => {
  return (
    <div className="w-full h-[60vh] md:h-[80vh]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative">
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* Black Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Text Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4 md:px-20">
                <div className="text-white max-w-3xl space-y-4">
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-lg lg:text-xl drop-shadow">
                    {slide.subtitle}
                  </p>
                  <button className="mt-4 px-5 py-2 md:px-6 md:py-3 bg-white cursor-pointer text-[#21BEDA] font-semibold rounded-md shadow hover:bg-gray-200 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
