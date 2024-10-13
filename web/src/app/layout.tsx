import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto_Slab } from "next/font/google";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-slab",
});
const comfortaaBold = localFont({
  src: "./fonts/Comfortaa-Bold.ttf",
  variable: "--font-comfortaa-bold",
  weight: "100 900",
});
const comfortaaLight = localFont({
  src: "./fonts/Comfortaa-Light.ttf",
  variable: "--font-comfortaa-light",
  weight: "100 900",
});
const comfortaaRegular = localFont({
  src: "./fonts/Comfortaa-Regular.ttf",
  variable: "--font-comfortaa-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "KondoAI | AI Organize Assistant",
  description: "Transform your cluttered spaces with personalized AI guidance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaaBold.variable} ${comfortaaLight.variable} ${comfortaaRegular.variable} ${robotoSlab.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
