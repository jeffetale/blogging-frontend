// src/components/about-components/UserProfile/index.jsx

import { Text, Img } from "./..";
import React from "react";

export default function UserProfile({
  userDescription = "Crafting clean, efficient code from frontend to backend. I build scalable applications",
  ...props
}) {
  return (
    <div
      {...props}
      className={`${props.className} flex flex-col items-start md:w-full gap-[118px] px-2.5 py-6 lg:gap-[42px]`}
    >
      <Img
        src="img_thumbs_up.svg"
        width={72}
        height={94}
        alt="Image"
        className="ml-[100px] w-[32%] h-[94px] object-contain"
      />
      <Text
        size="textxs"
        as="p"
        className="text-[19px] tracking-[0.57px] mb-[42px] w-[92%] self-end font-normal leading-7 text-black-900"
      >
        {userDescription}
      </Text>
    </div>
  );
}
