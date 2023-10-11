"use client"

import { Suspense, useEffect, useState } from "react";

// import react slick
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Slider from "react-slick";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import { BASE_URL } from "@/constants/appInfos";
import axios from "axios";
import { useRouter } from "next/navigation";

const NewSlider = () => {
  const [listNews, setListNews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/News`)
    .then(res => {
      setListNews(res.data)
      setIsLoading(false)
    })
    .catch(err => {
      console.log(err);
    })
  }, [])


  const settings = {
    dots: true,
    customPaging: function (i:any) {
      return (
        <a className="">
          <span className="mx-2 rounded-l-full rounded-r-full h-4 w-4 block cursor-pointer transition-all "></span>
        </a>
      );
    },
    dotsClass: "slick-dots w-max absolute -bottom-24  ",
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState<any>(null);

  const router = useRouter();

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className=""
      >
          {listNews.map((listNew:any, index:any) => (
            <div className="px-3 flex items-stretch" key={listNew.title}>
              <Card  key={listNew.title} className="p-0 border-2 border-gray-500 hover:border-primary transition-all rounded-lg flex flex-col">
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
                <CardContent className="py-4 px-8 flex flex-col justify-start">
                  <h4 className="font-bold text-left mb-4 text-lg">{listNew.title || "Title"}</h4>
                  <p className="text-justify">
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
      </Slider>
      <div className="flex w-full items-center justify-end">
        <div className="flex flex-none justify-between w-auto mt-14">
          <div
            className="mx-4 flex items-center justify-center h-14 w-14 rounded-full bg-white border-primary border hover:bg-primary hover:text-white-500 transition-all text-primary cursor-pointer"
            onClick={sliderRef?.slickPrev}
          >
            <ArrowBigLeft className="h-6 w-6 " />
          </div>
          <div
            className="flex items-center justify-center h-14 w-14 rounded-full bg-white border-primary border hover:bg-primary hover:text-white-500 transition-all text-primary cursor-pointer"
            onClick={sliderRef?.slickNext}
          >
            <ArrowBigRight className="h-6 w-6" />
          </div>
        </div>
      </div>
    </>
  );
};

export default NewSlider;
