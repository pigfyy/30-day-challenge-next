"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Screenshot {
  src: string;
  alt: string;
  title: string;
  description: string;
}

interface ScreenshotCarouselProps {
  screenshots: Screenshot[];
}

export const ScreenshotCarousel = ({
  screenshots,
}: ScreenshotCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + screenshots.length) % screenshots.length,
    );
  };

  return (
    <div className="relative mx-auto md:px-6">
      {/* Main Image Container */}
      <div className="relative overflow-hidden rounded-lg border bg-white shadow-lg">
        <Image
          src={screenshots[currentSlide].src}
          alt={screenshots[currentSlide].alt}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />
      </div>

      {/* Navigation Controls */}
      <div className="mt-4 flex items-center justify-center gap-4">
        {/* Left Arrow */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="bg-white shadow-sm hover:bg-gray-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentSlide
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Right Arrow */}
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="bg-white shadow-sm hover:bg-gray-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Title */}
      <div className="mx-auto mt-3 max-w-md space-y-1 px-6 text-center">
        <p className="text-sm font-semibold text-gray-800">
          {screenshots[currentSlide].title}
        </p>
        <p className="mx-auto max-w-md text-xs text-gray-600">
          {screenshots[currentSlide].description}
        </p>
      </div>
    </div>
  );
};
