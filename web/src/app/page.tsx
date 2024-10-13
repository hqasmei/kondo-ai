import Image from "next/image";

import { Button } from "@/components/ui/button";
import Hero from "@/components/hero";
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
            <a href="#demo" className="hover:text-sky-blue">
              Demo
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
        <Hero />
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
