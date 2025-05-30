"use client";
import { LanguageContext } from "@/context/language.context";
import { useScrollReveal } from "@/hooks/useScrollReveal ";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ProductImage {
  image: StaticImageData;
  mobileImage:StaticImageData;
  title: string;
  text?: string;
  texto?: string;
  path: string;
}

interface Props {
  gallery: ProductImage[];
}

export const ProductSlider = ({ gallery }: Props) => {
  const { language } = useContext(LanguageContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % gallery.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const refProductSlider = useScrollReveal<HTMLDivElement>("efectoReveal");
  const refTitle = useScrollReveal<HTMLDivElement>("title-reveal");

  return (
    <div
      ref={refProductSlider}
      className="relative w-[100%] h-[80vh] flex flex-col justify-center items-center  "
    >
      {gallery.map((item, index) => {
        return (
          <div
            key={item.path}
            className={`absolute ${
              index === currentSlide
                ? "opacity-100 z-10 translate-x-0"
                : "translate-x-[10vw] opacity-0 z-0"
            } transition-all duration-1000 overflow-hidden sm:rounded-[15px]  flex justify-center md:justify-start items-center w-[100%] h-[100%] border-[1px] border-primary border-collapse bg-black bg-opacity-80`}
          >
            <div className="min-h-[50%] w-[70%] sm:w-[40%] md:w-[60%] lg:w-[40%] md:ml-[8%] flex flex-col justify-center gap-y-[2vh] z-10 text-white ">
              <strong
                ref={refTitle}
                className="bg-primary w-fit px-3 py-3 text-[1.5rem] lg:text-[2rem] text-black font-medium"
              >
                {language === "spanish" ? "Destacado" : "Featured"}
              </strong>
              <h4 className="text-[3rem] lg:text-[4rem]">{item.title}</h4>
              <p className="text-[1.6rem] lg:text-[2rem] md:w-[80%] ">
                {language === "spanish"
                  ? gallery[currentSlide].texto
                  : gallery[currentSlide].text}
              </p>

              <Link
                href={item.path}
                className="w-fit mt-[3vh] text-[1.6rem] md:text-[1.4rem] lg:text-[1.6rem] hover-border"
              >
                {" "}
                {language === "spanish" ? "VER PRODUCTO" : "VIEW PRODUCT"}
              </Link>
            </div>

            <Image
              fill
              src={item.image}
              alt={item.title}
              className="absolute hidden md:block w-full h-full object-cover sm:rounded-[15px]"
            />
               <Image
              fill
              src={item.mobileImage}
              alt={item.title}
              className="absolute md:hidden w-full h-full object-cover sm:rounded-[15px]"
            />

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white  p-4 rounded-full shadow-lg hover:bg-gray-100"
            >
              <FaChevronLeft className="text-2xl text-primary" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-4 rounded-full shadow-lg hover:bg-gray-100"
            >
              <FaChevronRight className="text-2xl text-primary" />
            </button>
            <div className="absolute bottom-4  flex justify-center mt-5 space-x-4 w-full ">
              {gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full  ${
                    currentSlide === index ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
