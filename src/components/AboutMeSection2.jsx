// src/components/AboutMeSection2.jsx

"use client";

import { Heading, SeekBar, Text, Img } from "./about-components";
import React from "react";

export default function AboutMeSection2() {
  return (
    <>
      {/* about me section */}
      <div className="sm:gap-[34px] gap-[68px] flex flex-col items-center self-stretch px-14 md:px-5 sm:px-5">
        <div className="max-w-[1560px] mx-auto w-full">
          <div className="mb-9 flex items-center md:flex-col">
            <div className="px-[38px] flex-1 md:self-stretch sm:px-4">
              <div className="flex flex-col items-end">
                <div className="flex flex-col items-start gap-1.5 self-stretch">
                  <Heading
                    size="headingxs"
                    as="h1"
                    className="lg:text-[20px] text-[24px] tracking-[0.72px] ml-32 font-semibold text-black-900"
                  >
                    Hi I am
                  </Heading>
                  <div className="h-[466px] relative self-stretch">
                    <div className="absolute left-0 right-0 top-0 mx-auto flex flex-col items-start">
                      <Heading
                        size="headings"
                        as="h2"
                        className="sm:text-[24px] md:text-[26px] lg:text-[27px] text-[32px] tracking-[0.96px]"
                      >
                        Jeff Etale
                      </Heading>
                      <Text
                        size="main_heading_h1"
                        as="h1"
                        className="md:text-[48px] lg:text-[48px] text-[100px] tracking-[3.00px] mt-[-36px]"
                      >
                        Software
                      </Text>
                    </div>
                    <div className="bottom-[-0.70px] absolute left-0 right-0 mx-auto flex flex-1 flex-col">
                      <Text
                        size="main_heading_h1"
                        as="h1"
                        className="md:text-[48px] lg:text-[48px] text-[100px] tracking-[3.00px] mr-20"
                      >
                        Engineer
                      </Text>
                      <div className="mt-[-72px] relative flex flex-col items-start self-stretch">
                        <Text
                          size="main_heading_h1"
                          as="h1"
                          className="md:text-[48px] lg:text-[48px] z-[1] text-[100px] tracking-[3.00px]"
                        >
                          &
                        </Text>
                        <Text
                          size="main_heading_h1"
                          as="h1"
                          className="md:text-[48px] lg:text-[48px] text-[100px] tracking-[3.00px] mt-[-5px]"
                        >
                          Ethical Hacker
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Text
            size="texts"
            as="p"
            className="lg:text-[17px] leading-[31px] z-[2] text-[21px] tracking-[0.63px] mt-[-14px]"
          >
            I'm a tech enthusiast who loves breaking stuff and building cool
            software solutions. When I'm not crafting clean code or finding
            sneaky vulnerabilities, I'm always up for a challenge. Besides
            coding, you'll probably find me geeking out over the latest AI
            trends or stalking the web.
          </Text>
        </div>
        <div className="w-[36%] md:w-full">
          <div className="flex flex-col items-center">
            <Img
              src="img_layer_0_copy_4.png"
              width={538}
              height={352}
              alt="Layer0copyfour"
              className="z-[3] w-[92%] h-[352px] relative self-end object-contain"
            />
            <div className="columnlayer0cop border rounded-[242px] mr-[30px] mt-[-220px] relative">
              <Img
                src="img_layer_0_copy_3.png"
                width={484}
                height={484}
                alt="Layer0copythree"
                className="rounded-[242px] h-[484px] w-full object-cover lg:h-auto md:h-auto"
              />
            </div>
          </div>
        </div>
        <div className="gap-[25px] mx-44 flex justify-end md:mx-0 sm:flex-col">
          <Img
            src="img_facebook_negative.svg"
            width={32}
            height={32}
            alt="Facebook"
            className="h-[32px] sm:w-full"
          />
          <Img
            src="img_twitter_negative.svg"
            width={32}
            height={32}
            alt="Twitter"
            className="h-[32px] sm:w-full"
          />
          <Img
            src="img_instagram_negative.svg"
            width={32}
            height={32}
            alt="Instagram"
            className="h-[32px] sm:w-full"
          />
          <Img
            src="img_link.svg"
            width={32}
            height={32}
            alt="Link"
            className="h-[32px] sm:w-full"
          />
        </div>
        <div className="max-w-[1594px] mx-auto flex w-full items-center justify-center gap-7 md:flex-col">
          <div className="h-[674px] relative flex-1 md:w-full md:flex-none md:self-stretch">
            <div className="columnbackgroun border rounded-[272px] right-[9%] bottom-[0.81px] w-[74%] absolute">
              <Img
                src="img_background_copy.png"
                width={544}
                height={544}
                alt="Backgroundcopy"
                className="rounded-[272px] h-[544px] w-full object-cover lg:h-auto md:h-auto"
              />
            </div>
            <Img
              src="img_background_copy_406x680.png"
              width={680}
              height={406}
              alt="Backgroundcopy"
              className="w-[84%] h-[406px] absolute right-px top-0 m-auto object-contain"
            />
          </div>
          <div className="w-[48%] flex flex-col items-start md:w-full">
            <Text
              size="h2_65"
              as="h1"
              className="md:text-[48px] lg:text-[48px] text-[65px] tracking-[1.95px] font-semibold text-black-900"
            >
              About Me
            </Text>
            <Text
              size="texts"
              as="p"
              className="lg:text-[17px] leading-[31px] text-[21px] tracking-[0.63px] w-full font-normal text-black-900"
            >
              Software developer with a passion for building secure, efficient
              solutions. With expertise spanning frontend, backend, and security
              testing, I bring a comprehensive approach to every project. My
              background in ethical hacking gives me unique insights into
              creating robust applications while maintaining the highest
              security standards.
            </Text>
            <div className="mt-[100px] flex flex-col gap-3.5 self-stretch">
              <div className="flex flex-col items-start gap-2">
                <Heading
                  size="headingxs"
                  as="h2"
                  className="lg:text-[20px] text-[24px] tracking-[0.72px] font-semibold text-black-900"
                >
                  Frontend
                </Heading>
                <SeekBar
                  inputValue={90.97}
                  trackColors={["#fd6f00", "#ececeb"]}
                  className="h-[32px] flex self-stretch rounded-md"
                  trackClassName="h-[12px] w-full rounded-md"
                  thumbClassName="flex justify-center items-center h-[32px] w-[32px] rounded-[50%] border-2"
                />
              </div>
              <div className="flex flex-col items-start">
                <Heading
                  size="headingxs"
                  as="h3"
                  className="lg:text-[20px] text-[24px] tracking-[0.72px] font-semibold text-black-900"
                >
                  Website Design
                </Heading>
                <SeekBar
                  inputValue={86.72}
                  trackColors={["#fd6f00", "#ececeb"]}
                  className="h-[32px] mt-2 flex self-stretch rounded-md"
                  trackClassName="h-[12px] w-full rounded-md"
                  thumbClassName="flex justify-center items-center h-[32px] w-[32px] rounded-[50%] border-2"
                />
                <Heading
                  size="headingxs"
                  as="h4"
                  className="lg:text-[20px] text-[24px] tracking-[0.72px] mt-3.5 font-semibold text-black-900"
                >
                  Backend
                </Heading>
                <SeekBar
                  inputValue={[95.22]}
                  trackColors={["#fd6f00", "#ececeb"]}
                  className="h-[32px] mt-2 flex self-stretch rounded-md"
                  trackClassName="h-[12px] w-full rounded-md"
                  thumbClassName="flex justify-center items-center h-[32px] w-[32px] rounded-[50%] border-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
