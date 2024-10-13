import Image from "next/image";
import ImageComparisonSlider from "@/components/image-comparison-slider";
import { Button } from "@/components/ui/button";
import Demo from "@/components/demo";
import HowItWorks from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-sans">
      <div className="bg-gradient-to-b from-[#3F6686] via-[#7FC8F8] to-transparent pb-20 md:pb-40">
        <header className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center text-off-white">
          <div className="flex-shrink-0 mb-4 md:mb-0">
            <Image
              src="/images/logo.svg"
              alt="KondoAI Logo"
              width={80}
              height={80}
            />
          </div>

          <nav className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mb-4 md:mb-0">
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

          <div className="flex items-center">
            <Button
              asChild
              variant="default"
              className="bg-white text-black hover:bg-white/70"
            >
              <Link href="/try">Try Now</Link>
            </Button>
          </div>
        </header>

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
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a
                  className="bg-[#3F6686] text-off-white px-6 sm:px-8 py-3 rounded-full hover:bg-[#7FC8F8] transition duration-300 text-center text-sm sm:text-base"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download on App Store
                </a>
                <a
                  className="bg-[#F6C14B] text-[#3F6686] px-6 sm:px-8 py-3 rounded-full hover:bg-[#7FC8F8] hover:text-off-white transition duration-300 text-center text-sm sm:text-base"
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it on Google Play
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
      </div>

      <div id="demo" className="bg-off-white py-12 md:py-20">
        <Demo />
      </div>

      <div id="how-it-works" className="bg-lapiz-lazule py-12 md:py-20">
        <HowItWorks />
      </div>

      <Pricing />

      <Footer />
    </div>
  );
}
