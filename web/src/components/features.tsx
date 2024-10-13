import React from "react";
import Image from "next/image";
import { FEATURES } from "@/constants";

interface Feature {
  headline: string;
  description: string;
  image: string;
}

const FeatureItem: React.FC<Feature & { index: number }> = ({
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
        <Image
          src={image}
          alt={headline}
          width={500}
          height={300}
          className="rounded-lg"
        />
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0">
        <h3 className="text-2xl font-bold mb-4">{headline}</h3>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <section className="py-16 bg-white container">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Features</h2>
        {FEATURES.map((feature, index) => (
          <FeatureItem key={index} {...feature} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Features;
