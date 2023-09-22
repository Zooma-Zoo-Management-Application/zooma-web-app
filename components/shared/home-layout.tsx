/* eslint-disable @next/next/no-img-element */
"use client"

import { ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AnimatedTextCharacters from "../framer-motion/AnimatedTextCharacters";
import { Button } from "../ui/button";

/* eslint-disable @next/next/no-html-link-for-pages */
export default function HomeLayout() {
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  return (
    <div>    
      <Button variant="default" size="icon" className="absolute bottom-5 right-5 z-50" 
        onClick={() => {
          setIsVideoMuted(!isVideoMuted)
          console.log(isVideoMuted)
        }}>
        {isVideoMuted ? <VolumeX /> : <Volume2 /> }
        
      </Button>  
      <section className="w-full text-white bg-gradient-to-r from-[#1f1f1f] from-[0%] to-[50%]">
        <div className="ml-10 flex items-end sm:items-center h-screen p-3 pt-20 sm:flex sm:flex-wrap sm:pt-4">
          <div className="video-background fixed z-[-1] h-full w-full top-0 left-0">
            <video
              autoPlay
              loop
              muted={isVideoMuted}
              className="object-cover object-center w-full h-full"
              src="https://firebasestorage.googleapis.com/v0/b/zooma-bf129.appspot.com/o/zooma-background-compress.mp4?alt=media&token=6da97cc8-c38b-4dc8-bc9c-c6174fd06063"
            />
          </div>
          
          <div className="lg:w-3/6 ml-4 mb-4 lg:mb-0 xl:ml-0">
            <h2 className="max-w-xl lg:text-[4.2em] text-4xl font-bold leading-none text-white inline-block font-amsi tracking-wider">
              <AnimatedTextCharacters text="Home of" replay className="text-4xl"/>
              <AnimatedTextCharacters text="Nature" replay className="animate-text bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent text-[1.6em] lg:text-[1em]"/>
            </h2>

            <p className="mt-6 max-w-2xl text-sm sm:text-base lg:text-lg text-white ">
            Step into a world where the animal kingdom thrives in harmony with the beauty of nature. Our zoo is a sanctuary for diverse species from across the globe, offering you a chance to explore the wonders of the natural world up close
            </p>
            <Button variant={"default"} className="mt-4 font-amsi tracking-wider">
            <svg className="mr-2" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.92115 7.50002L0.568117 13.2481C0.458794 13.4355 0.482813 13.672 0.627577 13.8336C0.772341 13.9952 1.00481 14.045 1.20308 13.9569L14.7031 7.95693C14.8836 7.87668 15 7.69762 15 7.50002C15 7.30243 14.8836 7.12337 14.7031 7.04312L1.20308 1.04312ZM4.84553 7.10002L2.21234 2.586L13.2689 7.50002L2.21234 12.414L4.84552 7.90002H9C9.22092 7.90002 9.4 7.72094 9.4 7.50002C9.4 7.27911 9.22092 7.10002 9 7.10002H4.84553Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              Book Ticket
            </Button>
          </div>
        </div>
        <div className="mt-0 bg-white pb-96">
          {/* section A */}
          <div className="mx-auto">
            <div className="mx-auto px-5 py-16 lg:px-24">
              <div className="my-10 flex w-full flex-col text-center">
                <h2 className="mb-5 text-2xl font-bold text-primary lg:text-3xl font-amsi tracking-[5px]">
                  Welcome To Zooma
                </h2>
              </div>
              <div
                className="
                grid grid-cols-1
                gap-16
                text-center
                lg:grid-cols-3"
              >
                <div className="flex flex-col items-center justify-center relative text-dark gap-3">
                  <Image
                    src="/ticket.jpg"
                    alt="ticket"
                    width={200}
                    height={200}
                    className="flex-1"
                  />
                  <div className="flex flex-col text-base">
                    <h2 className="font-amsi text-3xl">Admisson</h2>
                    <span>Open 7 days a week</span>
                    <span>8:00  am - 17:00 pm</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center relative text-dark gap-3">
                  <Image
                    src="/wheelchair.jpg"
                    alt="ticket"
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-col text-base">
                    <h2 className="font-amsi text-3xl">Handicapped Friendly</h2>
                    <span>Zooma always has supporters for</span>
                    <span>handicapped people</span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center relative text-dark gap-3">
                  <Image
                    src="/map.jpg"
                    alt="ticket"
                    width={200}
                    height={200}
                  />
                  <div className="flex flex-col text-base">
                    <h2 className="font-amsi text-3xl">Explore the world</h2>
                    <span>Check out our map to see where your</span>
                    <span>favourite creature are located</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* section B */}
          <div className="text-dark">
              <div className="my-10 flex w-full flex-col text-center">
                <h2 className="mb-5 text-2xl font-bold text-primary lg:text-3xl font-amsi tracking-[5px]">
                  Meet Our Animals (News 🐧)
                </h2>
              </div>
            <div
              className="
              max-w-9xl
              mx-auto
              flex
              flex-col
              items-center
              justify-center
              px-5
            "
            >
              <div className="relative background-texture max-w-8xl w-full h-72">
                <div className="absolutetop-5 right-5 left-5 flex items-center gap-10">
                  <Button variant="default" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 flex justify-between">
                    {/* <AnimalCard />
                    <AnimalCard />
                    <AnimalCard /> */}
                  </div>
                  <Button variant="default" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto px-5 pt-32 pb-24 lg:px-24 mt-4">
          <div className="my-3 flex w-full flex-col text-left lg:text-center">
            <h2 className="bold mb-8 text-4xl font-bold leading-tight text-black lg:text-6xl">
              Lorem ipsum elit sit unar,{" "}
              <br className="hidden lg:inline-block" />
              consectetur adipiscing elit.
            </h2>
          </div>
          <div className="flex w-full flex-col text-left lg:text-center">
            <h3 className="text-2xl text-black">
              Lorem ipsum arcu, consectetur adipiscing elit. Viverra elementum
              pellentesque <br className="hidden lg:inline-block" />
              tortor, luctus blandit sed dolor et, semper. Posuere vitae vitae,
              ac mus. Arcu quis feugiat.
            </h3>
          </div>
          <div className="flex w-full flex-row justify-center pt-24 text-center">
            <a
              href="/"
              className="underline-blue px-8 text-xl font-semibold text-black"
            >
              Ut eleifend.
            </a>
            <a
              href="/"
              className="underline-gray px-6 text-xl font-semibold text-gray-700"
            >
              Tempus in.
            </a>
          </div>
        </div>
        <div className="invisible mx-auto flex max-w-6xl p-3 pb-32 lg:visible lg:px-2">
          <img src="/images/placeholder.png" alt="img" />
        </div>
        <div className="bg-white text-black">
          <div className="mx-auto flex flex-col items-center px-5 pt-56 lg:flex-row">
            <div className="mb-16 flex flex-col text-left lg:mb-0 lg:w-1/2 lg:flex-grow lg:items-start lg:pr-6">
              <h2 className="mb-4 text-4xl font-bold leading-none sm:text-5xl">
                Bibendum tortor et sit convallis nec morbi.
              </h2>
              <p className="font-3xl mb-8 font-semibold leading-relaxed">
                Lorem ipsum auctor sit amet, consectetur adipiscing elit. Sit a
                egestas tortor viverra nisl, in non. Neque viverra sollicitudin
                amet volutpat auctor amet. Aliquam pellentesque condimentum
                mauris sit tincidunt egestas ullamcorper sit.{" "}
              </p>
            </div>
            <div className="lg:w-full lg:max-w-2xl">
              <img src="/images/placeholder.png" alt="img" />
            </div>
          </div>
          <div className="mt-32">
            <div className="mx-auto flex flex-col px-5 py-24 text-left lg:flex-row">
              <div className="hidden lg:inline-block lg:w-full lg:max-w-xl">
                <img src="/images/placeholder.png" alt="img" />
              </div>
              <div className="flex flex-col pt-0 text-left lg:w-1/2 lg:flex-grow lg:items-start lg:pl-16 lg:pt-24">
                <h2 className="mb-4 text-4xl font-bold leading-none sm:text-5xl">
                  Eu diam in magna blandit sit magna dolor proin velit.
                </h2>
                <p className="mb-8 font-semibold leading-relaxed text-black">
                  Lorem ipsum ac neque, consectetur adipiscing elit. Nibh neque,
                  ut purus donec sed donec semper ac vestibulum. Mi urna,
                  facilisis arcu, auctor elit. Ut nunc non aenean netus ut.
                </p>
              </div>
              <div className="inline-block lg:hidden lg:w-full lg:max-w-xl">
                <img src="/images/placeholder.png" alt="img" />
              </div>
            </div>
          </div>
          <div className="my-24 p-4 text-black">
            <div className="max-w-9xl mx-auto flex flex-col items-center bg-gradient-to-r from-blue-200 to-blue-100 px-5 py-24 lg:flex-row">
              <div className="flex flex-col items-center pb-16 pl-0 text-center lg:mb-0 lg:w-1/2 lg:flex-grow lg:items-start lg:pl-12 lg:pr-24 lg:text-left">
                <h2 className="pb-4 text-2xl font-bold leading-tight lg:text-4xl">
                  Lorem ipsum mi at amet, consecteturadipiscing elit. Mattis.
                </h2>
                <p className="text-md mb-8 lg:text-xl">
                  Lorem ipsum praesent amet, consectetur adipiscing elit. Cursus
                  ullamcorper id tristique tincidunt. Tincidunt feugiat at mi
                  feugiat hendrerit. Ac faucibus accumsan, quis lacus, lectus
                  eget bibendum. At praesent quisque sollicitudin fusce.
                </p>
              </div>
              <div className="w-4/7 pr-12 lg:w-2/5">
                <img
                  src="/images/placeholder.png"
                  className="hidden object-cover object-center lg:inline-block"
                  alt="image"
                />
                <img
                  src="/images/placeholder.png"
                  className="inline-block object-cover object-center lg:hidden"
                  alt="image"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="max-w-8xl mx-auto px-5 py-24 lg:px-24">
              <div className="my-6 flex w-full flex-col text-left lg:text-center">
                <h3 className="mb-8 text-5xl font-bold text-black">
                  Dui tellus quis magna id ultricies eu sed.
                </h3>
                <h3 className="mb-12 px-0 text-lg font-semibold text-gray-900 lg:px-52">
                  Lorem ipsum accumsan arcu, consectetur adipiscing elit.
                  Aliquet vestibulum molestie amet, maecenas id amet. Ipsum
                  accumsan arcu, aenean viverra penatibus quis. Laoreet.
                </h3>
              </div>
              <img src="/images/placeholder.png" alt="img" />
            </div>
          </div>
          <div className="text-black">
            <div className="max-w-8xl mx-auto flex flex-col px-5 py-48 text-black lg:flex-row">
              <div className="lg:mb-0 lg:w-full lg:max-w-xl">
                <img
                  className="rounded object-cover object-center"
                  alt="image"
                  src="/images/placeholder1.png"
                />
              </div>
              <div className="items-left flex flex-col pt-16 text-left lg:w-1/2 lg:flex-grow lg:items-start lg:pl-32 lg:text-left">
                <h2 className="mb-2 text-lg leading-tight text-gray-700 sm:text-lg">
                  Viverra enim diam gravida risus nisl.
                </h2>
                <h2 className="mb-6 text-lg font-bold sm:text-lg">
                  Lectus eu.
                </h2>
                <h2 className="mb-4 text-3xl font-bold sm:text-3xl">
                  Lorem ipsum accumsan arcu, consectetur adipiscing elit. Sed
                  eget enim vel.
                </h2>
                <a
                  href="/"
                  className="underline-blue mt-12 text-lg font-bold leading-relaxed"
                >
                  Ut convallis massa.
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}