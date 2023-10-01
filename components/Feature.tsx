import Image from "next/image";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ScrollAnimationWrapper from "./framer-motion/ScrollAnimationWrapper";
import getScrollAnimation from "@/lib/utils";
import { CheckCircle } from "lucide-react";

const features = [
  "Enhanced Language Development",
  "Promotes Family Bonding",
  "Encourages Environmental Awareness",
  "Increase Academic Knowledge",
]

const Feature = () => {
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  return (
    <div className="bg-white-300 font-amsi">
      <div
      className="max-w-screen-xl mt-6 pt-8 pb-6 sm:pt-14 sm:pb-14 px-6 sm:px-8 lg:px-16 mx-auto "
      id="feature"
    >
      <div className="grid grid-flow-row sm:grid-flow-col grid-cols-1 sm:grid-cols-2 gap-8 p  y-8 py-12">
        <ScrollAnimationWrapper className="flex w-full justify-end">
          <motion.div className="h-full w-full p-4" variants={scrollAnimation}>
            <Image
              src="/peguin.jpg"
              alt="peguin"
              layout="responsive"
              className="rounded-sm"
              quality={100}
              height={414}
              width={508}
            />
          </motion.div>
        </ScrollAnimationWrapper>
        <ScrollAnimationWrapper>

        <motion.div className="flex flex-col justify-center ml-auto w-full lg:w-9/12" variants={scrollAnimation}>
          <h3 className="text-3xl lg:text-4xl font-medium leading-relaxed text-black-600">
            Why You Should Visit The Zoo?
          </h3>
          <p className="my-2 text-black-500">
            You can see amazing animals, explore their environment, make new discoverie and learn about:
          </p>
          <ul className="text-black-500 self-start list-inside ml-8">
            {features.map((feature, index) => (
              <motion.li
                className="relative circle-check custom-list flex items-center gap-2 mb-2"
                custom={{duration: 2 + index}}
                variants={scrollAnimation}
                key={feature}
                whileHover={{
                scale : 1.1,
                transition: {
                  duration: .2
                }
                }}>
                  <CheckCircle className="w-6 h-6"/>
                  {feature}
              </motion.li>
              )
            )}
          </ul>
        </motion.div>
        </ScrollAnimationWrapper>
      </div>
    </div>
    </div>
  );
};

export default Feature;
