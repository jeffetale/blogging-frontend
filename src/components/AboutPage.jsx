// src/components/AboutPage.jsx
"use client";

import { Button, Input, Text } from "./about-components";
import AboutMeSection from "./AboutMeSection2";
import LandingPageSection from "./AboutLandingPageSection2";
import React from "react";

export default function AboutPage() {
  return (
    <div className="py-[70px] flex w-full flex-col items-center bg-white-a700 lg:py-8 md:py-5 sm:py-4">
      {/* about me section */}
      <AboutMeSection />

      {/* landing page section */}
      <LandingPageSection />

      <div className="mt-[180px] w-[48%] mb-1 flex flex-col gap-12 lg:w-full lg:px-5 md:w-full md:px-5">
        <div className="flex flex-col items-center gap-3.5">
          <Text
            size="h2 65"
            as="h1"
            className="md:text-[48px] lg:text-[48px] text-[65px] tracking-[1.95px] font-semibold text-black-900"
          >
            Got a project in mind?
          </Text>
          <Text
            size="texts"
            as="p"
            className="lg:text-[17px] leading-[31px] text-[21px] tracking-[0.63px] self-stretch text-center font-normal text-black-900"
          >
            Whether you need secure software solutions or want to make sure your
            systems can withstand attacks, let's team up and build something
            rock-solid together.
          </Text>
        </div>
        <div className="mx-7 flex justify-center gap-6 md:mx-0 md:flex-col">
          <Input
            shape="round"
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="rounded-[14px] tracking-[0.63px] border px-6"
          />
          <Button
            shape="round"
            className="rounded-[14px] min-w-[222px] tracking-[0.72px] px-[34px] sm:px-4"
          >
            Contact Me
          </Button>
        </div>
      </div>
    </div>
  );
}
