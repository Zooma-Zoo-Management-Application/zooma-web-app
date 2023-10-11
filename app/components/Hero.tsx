"use client"

import React, { useMemo } from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import getScrollAnimation from "@/lib/utils";
import ScrollAnimationWrapper from "../../components/framer-motion/ScrollAnimationWrapper";
import { Button } from "../../components/ui/button";
import AnimatedTextCharacters from "../../components/framer-motion/AnimatedTextCharacters";
import { LocateIcon, Ticket, UserIcon } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Calendar } from "../../components/ui/calendar";
import { CalendarDateRangePicker } from "../../components/shared/DateTimePicker";

const Hero = ({
  listUser = [
    {
      name: "Admisson",
      description: "Open 7 days a week. From 9am to 5pm.",
    },
    {
      name: "Handicapped Friendly",
      description: "Always has supporters for the people.",
    },
    {
      name: "Explore the Wild",
      description: "Check out map to see amazing animals.",
    },
  ],
}) => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="max-w-screen-xl mt-24 px-8 xl:px-16 mx-auto"
      id="about"
    >
      <ScrollAnimationWrapper>
          <motion.div
            className="grid grid-flow-row sm:grid-flow-col grid-rows-2 md:grid-rows-1 sm:grid-cols-1 gap-8 py-6 sm:py-24"
            variants={scrollAnimation}>
            <div className=" flex flex-col justify-center items-start sm:items-center row-start-2 sm:row-start-1 col-span-">
              <h2 className="font-medium text-white-500 leading-normal flex flex-col items-start sm:items-center">
                <AnimatedTextCharacters text="EXPLORE THE" replay className="drop-shadow-lg [word-spacing:5px] tracking-wide font-amsi text-4xl lg:text-6xl"/>
                <AnimatedTextCharacters text="WILD WITH US!" replay className="drop-shadow-lg [word-spacing:5px] tracking-wide font-amsi text-4xl lg:text-6xl animate-text bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent "/>
              </h2>
              <p className="text-white-500 mt-4 mb-6 drop-shadow-lg font-semibold">
                Step into a world where the animal kingdom 
                thrives in harmony with the beauty of nature.
              </p>
              <div className="flex lg:mt-14">
                <CalendarDateRangePicker /> 
                <Button className="rounded-s-none hover:shadow-primary-md">
                  Buy Tickets
                </Button>
              </div>
              
            </div>
          </motion.div>
      </ScrollAnimationWrapper>
      <div className="relative w-full flex">
        <ScrollAnimationWrapper
          className="rounded-lg w-full grid grid-flow-row sm:grid-flow-row grid-cols-1 sm:grid-cols-3 py-9 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-gray-100 bg-white-500 z-10">
          {listUser.map((listUsers, index) => (
            <motion.div
              className="flex items-center justify-start sm:justify-center py-4 sm:py-6 w-[80%] px-4 sm:w-auto mx-auto sm:mx-0"
              key={listUsers.name}
              custom={{duration: 2 + index}}
              variants={scrollAnimation}
            >
              <div className="flex mx-auto w-full lg:w-auto">
                <div className="flex items-center justify-center bg-green-100 w-12 h-12 mr-6 rounded-full p-4">
                  {
                    index === 0 ? (
                      <Ticket className="h-6 w-6"/>
                    ) : index === 1 ? (
                      <LocateIcon className="h-6 w-6"/>
                    ) : (
                      <UserIcon className="h-6 w-6"/>
                    )
                  }
                </div>
                <div className="flex flex-col">
                  <p className="text-xl text-black-600 font-bold font-amsi">
                    {listUsers.name}
                  </p>
                  <p className="text-sm text-black-500">{listUsers.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
       </ScrollAnimationWrapper>
       <div
          className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-64 sm:h-48 top-0 mt-8 mx-auto left-0 right-0"
          style={{ filter: "blur(114px)" }}
       ></div>
      </div>
    </div>
  );
};

export default Hero;
