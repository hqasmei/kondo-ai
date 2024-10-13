import Image from "next/image";
import { Camera, Maximize, Layers } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-[#F8F9FA] text-[#2B668E] min-h-screen font-sans">
      <header className="p-4 md:p-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Camera className="text-[#7EC5CE] mr-2" />
          <span className="text-xl font-bold">KondoAI</span>
        </div>
        <nav className="flex space-x-4">
          <a href="#features" className="hover:text-[#7EC5CE]">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[#7EC5CE]">
            How it works
          </a>
          <a href="#pricing" className="hover:text-[#7EC5CE]">
            Pricing
          </a>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20">
          <div className="w-full md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Declutter your life with AI
            </h1>
            <p className="text-xl mb-8">
              Transform your cluttered spaces into organized havens with
              personalized AI guidance.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                className="bg-[#2B668E] text-white px-8 py-3 rounded-full hover:bg-[#7EC5CE] transition duration-300 text-center"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download on App Store
              </a>
              <a
                className="bg-[#FFD46E] text-[#2B668E] px-8 py-3 rounded-full hover:bg-[#7EC5CE] hover:text-white transition duration-300 text-center"
                href="#"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get it on Google Play
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7EC5CE] rounded-full filter blur-3xl opacity-20"></div>
            <Image
              src="/images/placeholder.png"
              alt="KondoAI app screenshot"
              width={400}
              height={800}
              className="relative z-10 rounded-3xl mx-auto"
            />
          </div>
        </section>

        <section id="features" className="py-12 md:py-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            How KondoAI works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#7EC5CE] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera size={32} color="#2B668E" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Snap</h3>
              <p>Take a photo of your cluttered space</p>
            </div>
            <div className="text-center">
              <div className="bg-[#7EC5CE] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Maximize size={32} color="#2B668E" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Analyze</h3>
              <p>AI identifies items and suggests organization strategies</p>
            </div>
            <div className="text-center">
              <div className="bg-[#7EC5CE] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Layers size={32} color="#2B668E" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Organize</h3>
              <p>Follow personalized step-by-step guidance</p>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="py-12 md:py-20 bg-[#2B668E] rounded-3xl p-8 md:p-12 text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            See the transformation
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-[45%]">
              <Image
                src="/images/before.png"
                alt="Before using KondoAI"
                width={400}
                height={800}
                className="rounded-3xl shadow-2xl w-full"
              />
              <p className="text-center mt-4 text-xl">Before</p>
            </div>
            <div className="w-full md:w-[45%]">
              <Image
                src="/images/after.png"
                alt="After using KondoAI"
                width={400}
                height={800}
                className="rounded-3xl shadow-2xl w-full"
              />
              <p className="text-center mt-4 text-xl">After</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="text-center py-12 bg-[#2B668E] mt-20 text-white">
        <p className="mb-4">
          Join over 10,000 organized homes. Start decluttering today!
        </p>
        <div className="flex justify-center space-x-4">
          <a
            className="text-[#FFD46E] hover:underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
          <a
            className="text-[#FFD46E] hover:underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </a>
          <a
            className="text-[#FFD46E] hover:underline"
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