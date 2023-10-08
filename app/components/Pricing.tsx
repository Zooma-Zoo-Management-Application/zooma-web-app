"use client"

import getScrollAnimation from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo } from "react";
import NewSlider from "@/app/components/NewSlider";
import ScrollAnimationWrapper from "@/components/framer-motion/ScrollAnimationWrapper";
import { Button } from "@/components/ui/button";


const Pricing = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div
      className="bg-gradient-to-b from-white-300 to-white-500 w-full py-14"
      id="pricing"
    >
      <div className="max-w-screen-xl  px-6 sm:px-8 lg:px-16 mx-auto flex flex-col w-full text-center justify-center">
        <div className="flex flex-col w-full">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed font-amsi"
            >
              Choose Your Ticket
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal w-10/12 sm:w-7/12 lg:w-6/12 mx-auto my-2 text-center"
            >
              Lets choose the ticket that best suits for your family vacation.
            </motion.p>
          </ScrollAnimationWrapper>
          <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-12 py-8 lg:py-12 px-6 sm:px-0 lg:px-6">
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale : 1.1,
                  transition: {
                    duration: .2
                  }
                }}
              >
                <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                  <Image
                    src="/icon/child.svg"
                    width={145}
                    height={165}
                    alt="child"
                  />
                </div>
                <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-4 font-amsi">
                  Child
                </p>
                <div className="flex flex-col w-full justify-center mb-8 flex-none mt-4">
                  <p className="text-2xl text-black-600 text-center mb-4 ">
                    Free
                  </p>
                  <Button>Select</Button>
                </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale : 1.1,
                  transition: {
                    duration: .2
                  }
                }}
              >
              <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                <Image
                  src="/icon/adult.svg"
                  width={145}
                  height={165}
                  alt="Adult"
                />
              </div>
              <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-4 font-amsi">
              Adult{" "}
              </p>
              <div className="flex flex-col w-full justify-center mb-8 flex-none mt-4">
                <p className="text-2xl text-black-600 text-center mb-4 ">
                  $9 <span className="text-black-500">/ day</span>
                </p>
                <Button>Select</Button>
              </div>
              </motion.div>
            </ScrollAnimationWrapper>
            <ScrollAnimationWrapper className="flex justify-center">
              <motion.div
                variants={scrollAnimation}
                className="flex flex-col justify-center items-center border-2 border-gray-500 rounded-xl py-4 px-6 lg:px-12 xl:px-20"
                whileHover={{
                  scale : 1.1,
                  transition: {
                    duration: .2
                  }
                }}
              >
              <div className="p-4 lg:p-0 mt-6 lg:mt-16">
                <Image
                  src="/icon/senior.svg"
                  width={145}
                  height={165}
                  alt="senior"
                />
              </div>
              <p className="text-lg text-black-600 font-medium capitalize my-2 sm:my-4 font-amsi">
                Senior{" "}
              </p>
              <div className="flex flex-col w-full justify-center mb-8 flex-none mt-4">
                <p className="text-2xl text-black-600 text-center mb-4 ">
                  $12 <span className="text-black-500">/ day</span>
                </p>
                <Button>Select</Button>
              </div>
              </motion.div>
            </ScrollAnimationWrapper>
          </div>
        </div>
        <div className="flex flex-col w-full my-16">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="font-amsi text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-relaxed w-9/12 sm:w-6/12 lg:w-4/12 mx-auto">
              Check our map{" "}
            </motion.h3>
            <motion.p className="leading-normal  mx-auto my-2 w-10/12 sm:w-7/12 lg:w-6/12" variants={scrollAnimation}>
              You should not afraid to get lost, because we have a useful map that will help you.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper>
            <motion.div className="py-4 w-full px-8 mt-12" variants={scrollAnimation}> 
              <div className="relative w-full sm:w-[70%] mx-auto aspect-video">
                <Image
                  src="/HugeGlobal.svg" 
                  // className="w-full h-auto" 
                  layout='fill'
                  objectFit='contain'
                  alt="Huge Global"
                />
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
          {/* <ScrollAnimationWrapper>
            <motion.div className="w-full flex justify-evenly items-center mt-4 flex-wrap lg:flex-nowrap" variants={scrollAnimation}>
              <Image
                src="/Icon/amazon.png"
                className="h-14 w-auto mt-4 lg:mt-2"
                alt=""
                height={50}
                width={50}
              />
              <Image
                src="/Icon/netflix.png"
                className="h-14 w-auto mt-2 lg:mt-0"
                alt=""
                height={50}
                width={50}
              />
              <Image
                src="/Icon/reddit.png"
                className="h-12 w-auto mt-2 lg:mt-0"
                alt=""
                height={50}
                width={50}
              />
              <Image
                src="/Icon/discord.png"
                className="h-14 w-auto mt-2 lg:mt-0"
                alt=""
                height={50}
                width={50}
              />
              <Image
                src="/Icon/spotify.png"
                className="h-12 w-auto mt-2 lg:mt-0"
                alt=""
                height={50}
                width={50}
              />
            </motion.div>
          </ScrollAnimationWrapper> */}
        </div>
        <div className="flex flex-col w-full my-16" id="testimoni">
          <ScrollAnimationWrapper>
            <motion.h3
              variants={scrollAnimation}
              className="font-amsi text-2xl sm:text-3xl lg:text-4xl font-medium text-black-600 leading-normal w-9/12 sm: lg:w-4/12 mx-auto">
              Check our news{" "}
            </motion.h3>
            <motion.p
              variants={scrollAnimation}
              className="leading-normal mx-auto mb-2 mt-4 w-10/12 sm:w-7/12 lg:w-6/12"
            >
              These are the stories of animals who have been helped by your
              support.
            </motion.p>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="w-full flex flex-col py-12">
            <motion.div variants={scrollAnimation}>
              <NewSlider />
            </motion.div>
          </ScrollAnimationWrapper>
          <ScrollAnimationWrapper className="relative w-full mt-16">
            <motion.div variants={scrollAnimation} custom={{duration: 3}}>
              <div className="absolute rounded-xl  py-8 sm:py-14 px-6 sm:px-12 lg:px-16 w-full flex flex-col sm:flex-row justify-between items-center z-10 bg-white-500">
                <div className="flex flex-col text-left w-10/12 sm:w-7/12 lg:w-5/12 mb-6 sm:mb-0">
                  <h5 className="font-amsi text-black-600 text-xl sm:text-2xl lg:text-3xl leading-relaxed font-medium">
                    Booking Now for <br /> Have Special Experiences!
                  </h5>
                  <p>Let&apos;s book with us and find the fun.</p>
                </div>
                <Button className="lg:py-6 px-12 lg:px-12 text-lg text-white-500 font-semibold py-4 rounded-lg hover:shadow-primary-md transition-all outline-none">Booking Now!</Button>
              </div>
              <div
                className="absolute bg-black-600 opacity-5 w-11/12 roudned-lg h-60 sm:h-56 top-0 mt-8 mx-auto left-0 right-0"
                style={{ filter: "blur(114px)" }}
                ></div>
            </motion.div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
