// src/components/AboutLandingPageSection2.jsx

"use client"

import { Text, Heading } from "./about-components";
import UserProfile from "./about-components/UserProfile";
import React, { Suspense } from "react";

const landingPageContent2 = [
  {
    userDescription:
      "Crafting clean, efficient code from frontend to backend. I build scalable applications that don&#39;t break.",
  },
  {
    userDescription:
      "Crafting clean, efficient code from frontend to backend. I build scalable applications that don&#39;t break.",
  },
  {
    userDescription:
      "Crafting clean, efficient code from frontend to backend. I build scalable applications that don&#39;t break.",
  },
  {
    userDescription:
      "Crafting clean, efficient code from frontend to backend. I build scalable applications that don&#39;t break.",
  }
];

export default function LandingPageSection2() {
  return (
    <>
      {/* landing page section */}
      <div className="mt-[132px] flex justify-center self-stretch px-14 md:px-5 sm:px-4">
        <div className="max-w-[1566px] mx-auto flex w-full items-center justify-end md:flex-col">
          <Heading
            size="headings"
            as="h2"
            className="sm:text-[24px] md:text-[26px] lg:text-[27px] leading-[48px] z-[4] text-[32px] tracking-[0.96px] mb-[290px] lg:w-[20%] w-[20%] relative self-end text-centre font-semibold text-black-900 md:w-full"
          >
            Full-Stack Development
          </Heading>
          <div className="gap-[38px] ml-[-364px] w-[74%] relative flex flex-col md:ml-0 md:w-full">
            <div className="mr-[238px] ml-[260px] flex flex-col items-center md:mx-0">
              <Text
                size="h2_65"
                as="h1"
                className="md:text-[48px] lg:text-[48px] text-[65px] tracking-[1.95px] font-semibold text-black-900"
              >
                Services
              </Text>
              <Text
                size="texts"
                as="p"
                className="lg:text-[17px] leading-[31px] text-[21px] tracking-[0.63px] self-stretch text-centre font-normal text-black-900"
              >
                From pixel-perfect interfaces to bulletproof security implementations, I bring a full spectrum of
                digital expertise to the table. Whether you need a complete web overhaul or just want to make your
                app won&#39;t fall apart under pressure, I&#39;ve got you covered.
              </Text>
            </div>
            <div className="gap-[30px] flex md:flex-col">
              <Suspense fallback={<div>Loading feed...</div>}>
                {landingPageContent2.map((d, index) => (
                  <UserProfile {...d} key={"landingP" + index} className="w-[26%]" />
                ))}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}