"use client";

import React from "react";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";

interface ImageComparisonSliderProps {
  imageUrlBefore: string;
  imageUrlAfter: string;
  altBefore: string;
  altAfter: string;
}

export default function ImageComparisonSlider({
  imageUrlBefore,
  imageUrlAfter,
  altBefore,
  altAfter,
}: ImageComparisonSliderProps) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <ReactCompareSlider
        itemOne={
          <ReactCompareSliderImage src={imageUrlBefore} alt={altBefore} />
        }
        itemTwo={<ReactCompareSliderImage src={imageUrlAfter} alt={altAfter} />}
        portrait={false}
        className="h-[300px] rounded-lg"
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
        handle={
          <div
            className="h-full w-1 flex items-center justify-center"
            style={{
              background: "white",
            }}
          >
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ transform: "rotate(180deg)" }}
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </div>
          </div>
        }
      />
    </div>
  );
}
