import { useState } from "react";

// import react slick
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import Slider from "react-slick";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

const NewSlider = ({
  listTestimoni = [
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
    {
      name: "iezh Robert",
      image: "/assets/people-3.png",
      city: "Warsaw",
      country: "Poland",
      rating: "4.5",
      testimoni:
        "Wow... I am very happy to use this VPN, it turned out to be more than my expectations and so far there have been no problems. LaslesVPN always the best",
    },
  ],
}) => {
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

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={setSliderRef}
        className="flex items-stretch justify-items-stretch"
      >
        {listTestimoni.map((listTestimonis, index) => (
          <div className="px-3 flex items-stretch" key={index}>
            <Card  key={index} className="p-0 border-2 border-gray-500 hover:border-primary transition-all rounded-lg flex flex-col">
              <CardHeader className="p-0">
                <div className="relative w-full h-32 mx-auto">
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/zooma-bf129.appspot.com/o/90999724_1373586466162248_652645393300979712_n.jpg?alt=media&token=023d1b85-942d-4512-90f2-20a5ee70429b"
                    layout='fill'
                    className="rounded-t-md"
                    objectFit='cover'
                    alt="News"
                  />
                </div>
              </CardHeader>
              <CardContent className="py-4 px-8 flex flex-col justify-start">
                <h4 className="font-bold text-left mb-4 text-lg">Flooding gives gives Central Park Zoo sea lion a brief free swim</h4>
                <p className="text-justify">
                A Central Park Zoo sea lion named Sally had a bit of a field day thanks to the severe weather in New York. The mammal ...
                </p>
              </CardContent>
              <CardFooter className="flex justify-between flex-row-reverse">
                <Button
                 className="hover:shadow-primary-md"
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
