"use client";

import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Icon } from '@iconify/react';

import "swiper/css";
import "swiper/css/effect-coverflow";

export function About() {
  const originalSlides = [
    {
      title: "Site Institucional",
      img: "/Setor-1.png",
      desc: "Ter mais posicionamento",
    },
    {
      title: "Otimização de SEO",
      img: "/Setor-2.png",
      desc: "Melhorar ranqueamento no Google",
    },
    {
      title: "Landing Page",
      img: "/Setor-3.png",
      desc: "Aumentar seu ROI e diminuir seu CAC",
    },
  ];

  // Duplicar os slides para garantir que o loop funcione com poucos slides
  const slides = [...originalSlides, ...originalSlides, ...originalSlides];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const swiperRef = useRef<any>(null);

  // Calcular o índice real baseado nos slides originais
  const getRealIndex = (index: number) => {
    return index % originalSlides.length;
  };

  const togglePlay = () => {
    if (!swiperRef.current) return;

    if (isPlaying) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index: number) => {
    if (!swiperRef.current) return;
    // Vai para a posição correspondente no array duplicado
    const targetIndex = index + originalSlides.length;
    swiperRef.current.slideTo(targetIndex);
  };

  return (
    <section className="w-full bg-[#F4F4F4] py-16 flex justify-center items-center">
      <div className="container flex flex-col items-center">
        <h1 className="text-lg sm:text-4xl font-semibold max-w-4xl px-4 mb-10 text-black text-center">
          Mais do que código, criamos experiências digitais que impulsionam negócios.
        </h1>

        {/* Descrição animada */}
        <div className="relative h-20 sm:h-24 mb-8 flex justify-center items-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={getRealIndex(activeIndex)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="text-center text-md sm:text-2xl font-medium max-w-sm px-4 text-black"
            >
              {originalSlides[getRealIndex(activeIndex)].desc}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Carrossel */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Inicializa no slide correto
            setActiveIndex(originalSlides.length);
          }}
          onSlideChange={(swiper) => {
            const realIndex = swiper.realIndex;
            setActiveIndex(realIndex);
          }}
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={2}
          loop={true}
          speed={600}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 1.5,
            slideShadows: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              coverflowEffect: {
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }
            },
            768: {
              slidesPerView: 2,
              coverflowEffect: {
                rotate: 0,
                stretch: 70,
                depth: 150,
                modifier: 1.5,
                slideShadows: true,
              }
            }
          }}
          className="w-full max-w-2xl"
          initialSlide={originalSlides.length}
        >
          {slides.map((s, i) => (
            <SwiperSlide
              key={i}
              className="w-[280px] md:w-[350px] lg:w-[400px] bg-[#041526] rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative h-[500px] flex flex-col">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover"
                />

                {/* Overlay escuro sobre a imagem */}
                <div className="absolute inset-0 bg-black/25"></div>

                {/* Título centralizado */}
                <div className="absolute top-50 left-0 right-0 p-4 z-10">
                  <h3 className="text-white text-4xl font-bold text-center">
                    {s.title}
                  </h3>
                </div>

                {/* Botão sobre a imagem */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center z-10">
                  <a
                    href="/Servicos"
                    className="flex justify-center items-center"
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-black/10 backdrop-blur-xl border-white/60 text-white hover:bg-white hover:text-black text-xs sm:text-sm md:text-lg md:px-5 md:py-5 mb-5 rounded-full font-bold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      Saiba mais
                    </Button>
                  </a>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex items-center justify-center mt-6 gap-4">
          {/* Paginação customizada baseada nos slides originais */}
          <div className="flex gap-2 bg-[#DBDBDB] h-10 w-auto p-5 rounded-full justify-center items-center">
            {originalSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 ${getRealIndex(activeIndex) === index
                  ? "bg-black w-8 h-2"  // Ativo - preto e largura maior
                  : "bg-[#ACACAC] w-2 h-2 hover:bg-black"  // Inativos
                  }`}
              ></button>
            ))}
          </div>

          {/* Botão Pausar/Reproduzir */}
          <div>
            <Button
              onClick={togglePlay}
              variant="outline"
              className="flex items-center bg-[#DBDBDB] backdrop-blur-md border-gray-300 text-black hover:bg-gray-100 rounded-full px-4 py-2 shadow-sm"
            >
              {isPlaying ? (
                <Icon icon="solar:pause-bold" className="w-5 h-5 text-black" />
              ) : (
                <Icon icon="solar:play-bold" className="w-5 h-5 text-black" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}