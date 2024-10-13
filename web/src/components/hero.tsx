import React from "react";
import ImageComparisonSlider from "./image-comparison-slider";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="container mx-auto px-4">
      <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 text-off-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Declutter your life with AI
          </h1>
          <p className="text-lg sm:text-xl mb-8">
            Transform your cluttered spaces into organized havens with
            personalized AI guidance.
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-44 h-auto"
            >
              <Image
                src="/images/apple-play-badge.png"
                width={176}
                height={52}
                alt="Download on the App Store"
                className="w-full h-auto"
              />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="w-50 h-auto"
            >
              <Image
                src="/images/google-play-badge.png"
                width={180}
                height={60}
                alt="Get it on Google Play"
                className="w-full h-auto"
              />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 relative mt-8 md:mt-0">
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-56 sm:h-56 bg-[#7FC8F8] rounded-full opacity-20"></div>
          <ImageComparisonSlider
            imageUrlBefore="/images/before.png"
            imageUrlAfter="/images/after.png"
            altBefore="KondoAI app screenshot - Before"
            altAfter="KondoAI app screenshot - After"
          />
        </div>
      </section>
    </div>
  );
}
