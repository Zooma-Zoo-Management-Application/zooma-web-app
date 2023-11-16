"use client"

import getScrollAnimation, { formatVND } from "@/lib/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import NewSlider from "@/app/components/NewSlider";
import ScrollAnimationWrapper from "@/components/framer-motion/ScrollAnimationWrapper";
import { Button } from "@/components/ui/button";
import ImageWithTextSkeleton from "../dashboard/components/ImageWithTextSkeleton";
import { useRouter } from "next/navigation";
import { getNews } from "@/lib/api/newAPI";
import MapChart from "../map/components/MapChart";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface IProps {
  tickets: any[];
}

const Pricing = ({tickets}: IProps) => {
  const [news, setNews] = useState<any>([])
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollAnimation = useMemo(() => getScrollAnimation(), []);

  const router = useRouter()

  const refresh = async () => {
    try {
      const res = await getNews();
      const { data } = res;
      setNews(data);
    } catch (err: any) {
      setError(`Error initializing the app: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const initialize = async () => {
      refresh()
    };
    initialize();
  }, [])

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
            {
              tickets.length == 0 ?
                  <>
                    <div className="col-span-1">
                      <ImageWithTextSkeleton/>
                    </div>
                    <div className="col-span-1">
                      <ImageWithTextSkeleton/>
                    </div>
                    <div className="col-span-1">
                      <ImageWithTextSkeleton/>
                    </div>
                  </>
              : tickets.map((ticket, index) => (
                <ScrollAnimationWrapper key={index} className="flex justify-center">
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
                        src={ticket.image || "/icon/child.svg"}
                        width={145}
                        height={165}
                        alt={ticket.name}
                      />
                    </div>
                    <h2 className="text-2xl text-black-600 font-medium capitalize my-2 sm:my-4 font-amsi">
                      {ticket.name}
                      <p className="text-base text-gray-600 font-sans ">
                        {ticket.description}
                      </p>
                    </h2>
                    
                    <div className="flex flex-col w-full justify-center mb-8 flex-none mt-4">
                      <p className="text-2xl text-black-600 text-center mb-4 ">
                        {formatVND(ticket.price)}
                      </p>
                      <Button onClick={() => router.push("/tickets")}>Select</Button>
                    </div>
                  </motion.div>
                </ScrollAnimationWrapper>
              ))
            }
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
                <MapChart />
              </div>
            </motion.div>
          </ScrollAnimationWrapper>
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
              <div className="grid grid-cols-3 gap-4">
                {
                  isLoading ? (
                    <>
                      <ImageWithTextSkeleton/>
                      <ImageWithTextSkeleton/>
                      <ImageWithTextSkeleton/>
                    </>
                  ) : (
                    <>
                      {news?.map((listNew:any, index:any) => (
                      <div className="px-3 flex items-stretch" key={listNew.title}>
                        <Card  key={listNew.title} className="p-0 border-2 border-gray-500 hover:border-primary transition-all rounded-lg flex flex-col justify-between">
                          <CardHeader className="p-0">
                            <div className="relative w-full h-32 mx-auto">
                              <Image
                                src={listNew.image}
                                layout='fill'
                                className="rounded-t-md"
                                objectFit='cover'
                                alt="News"
                              />
                            </div>
                          </CardHeader>
                          <CardContent className="py-4 px-8 flex flex-col justify-start items-start">
                            <h4 className="font-bold text-left mb-4 text-lg">{listNew.title || "Title"}</h4>
                            <p className="text-justify text-ellipsis">
                            {listNew.description || "Description"}
                            </p>
                          </CardContent>
                          <CardFooter className="flex justify-between flex-row-reverse">
                            <Button
                            className="hover:shadow-primary-md"
                            onClick={() => router.push(`/news/${listNew.id}`)}
                            >
                              View more
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    ))}
                    </>
                  )
                }
              </div>
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
                <Button className="lg:py-6 px-12 lg:px-12 text-lg text-white-500 font-semibold py-4 rounded-lg hover:shadow-primary-md transition-all outline-none"
                  onClick={() => router.push('/tickets')}
                >Booking Now!</Button>
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
