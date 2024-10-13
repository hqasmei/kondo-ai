import React from "react";
import Image from "next/image";
import { HOW_IT_WORKS } from "@/constants";

interface Step {
  title: string;
  description: string;
  icon: string;
}

const StepItem: React.FC<Step & { number: number }> = ({
  title,
  description,
  icon,
  number,
}) => {
  return (
    <div className="flex flex-col items-center text-center mb-8 md:mb-0">
      <div className="bg-sky-blue rounded-full p-4 mb-4">
        <Image src={icon} alt={title} width={48} height={48} />
      </div>
      <h3 className="text-xl font-bold mb-2">
        Step {number}: {title}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const HowItWorks = () => {
  return (
    <section className="py-16 bg-kondo-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS.map((step, index) => (
            <StepItem key={index} {...step} number={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
