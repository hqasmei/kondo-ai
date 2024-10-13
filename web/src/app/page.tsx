import Image from "next/image";
import ImageComparisonSlider from "@/components/image-comparison-slider";
import { Button } from "@/components/ui/button";
import Features from "@/components/features";
import Demo from "@/components/demo";
import HowItWorks from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <div className="bg-gradient-to-b from-[#3F6686] via-[#7FC8F8] to-transparent pb-40">
        <header className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center text-off-white">
          <div className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="KondoAI Logo"
              width={100}
              height={100}
            />
          </div>

          <nav className="hidden md:flex space-x-6 flex-grow justify-center">
            <a href="#features" className="hover:text-sky-blue">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-sky-blue">
              How it works
            </a>
            <a href="#pricing" className="hover:text-sky-blue">
              Pricing
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              asChild
              variant="default"
              className="bg-white text-black hover:bg-white hover:bg-white/70"
            >
              <Link href="/try">Try Now</Link>
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4">
          <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 text-off-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
                Declutter your life with AI
              </h1>
              <p className="text-xl mb-8">
                Transform your cluttered spaces into organized havens with
                personalized AI guidance.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  className="bg-[#3F6686] text-off-white px-8 py-3 rounded-full hover:bg-[#7FC8F8] transition duration-300 text-center"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download on App Store
                </a>
                <a
                  className="bg-[#F6C14B] text-[#3F6686] px-8 py-3 rounded-full hover:bg-[#7FC8F8] hover:text-off-white transition duration-300 text-center"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it on Google Play
                </a>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#7FC8F8] rounded-full opacity-20"></div>
              <ImageComparisonSlider
                imageUrlBefore="/images/before.png"
                imageUrlAfter="/images/after.png"
                altBefore="KondoAI app screenshot - Before"
                altAfter="KondoAI app screenshot - After"
              />
            </div>
          </section>
        </div>
      </div>

      <div id="features" className="flex items-center justify-center">
        <Features />
      </div>

      <div
        id="demo"
        className="flex items-center justify-center bg-off-white py-20"
      >
        <Demo />
      </div>

      <div
        id="how-it-works"
        className="flex items-center justify-center bg-lapiz-lazule h-screen"
      >
        <HowItWorks />
      </div>

      <div
        id="pricing"
        className="flex items-center justify-center bg-lapiz-lazule"
      >
        <Pricing />
      </div>

      <footer className="text-center py-12 bg-lapis-lazuli mt-20 text-off-white">
        <div className="flex justify-center space-x-4">
          <a
            className="text-mustard hover:underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            className="text-mustard hover:underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <a
            className="text-mustard hover:underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
}
