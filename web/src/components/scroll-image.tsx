"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const ScrollingImage: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const animate = () => {
      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + 0.5; // Adjust this value to change scroll speed
        return newPosition >= container.scrollHeight - container.clientHeight
          ? 0
          : newPosition;
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-64 h-[500px] mx-auto overflow-hidden rounded-2xl shadow-lg relative border-4 border-black"
    >
      <div
        style={{ transform: `translateY(-${scrollPosition}px)` }}
        className=""
      >
        <Image
          src="/images/4.png"
          alt="Scrolling content"
          width={256}
          height={2000}
          style={{ objectFit: "cover", width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default ScrollingImage;
