import React from "react";
import Image from "next/image";
import { HOW_IT_WORKS } from "@/constants";
import ScrollingImage from "./scroll-image";

interface Feature {
  headline: string;
  description: string;
  image: string;
}

const HowItWorksItem: React.FC<Feature & { index: number }> = ({
  headline,
  description,
  image,
  index,
}) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center my-16`}
    >
      <div className={`w-full md:w-1/2 ${isEven ? "md:pr-8" : "md:pl-8"}`}>
        <div className="relative w-full max-w-[300px] mx-auto aspect-[9/16]">
          <Image
            src={image}
            alt={headline}
            fill
            className="rounded-lg object-contain"
          />
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <h3 className="text-2xl font-bold mb-4">{headline}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        {HOW_IT_WORKS.map((item, index) => (
          <HowItWorksItem key={index} {...item} index={index} />
        ))}
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <div className="max-w-[300px] mx-auto">
              <div className="relative">
                <ScrollingImage />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">Before and After</h2>
            <p className="text-lg">
              Visualize your organization journey with our scrolling
              before-and-after feature. See the dramatic transformations of
              spaces as you implement our organization tips and tricks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
