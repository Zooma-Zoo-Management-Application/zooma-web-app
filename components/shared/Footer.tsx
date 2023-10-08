import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#F8F8F8] pt-44 pb-24">
      <div className="max-w-screen-xl w-full mx-auto px-6 sm:px-8 lg:px-16 grid grid-rows-6 sm:grid-rows-1 grid-flow-row sm:grid-flow-col grid-cols-3 sm:grid-cols-12 gap-4">
        <div className="row-span-2 sm:col-span-4 col-start-1 col-end-4 sm:col-end-5 flex flex-col items-start ">
          <Image
            src="/logos/Zooma_Black_Text.svg"
            alt="logo"
            width={180}
            height={50}
          />
          <p className="mb-4">
            <strong className="font-medium">Zooma</strong> is a zoo management web application that aims to transform how information is managed within the zoo facility.
          </p>
          <div className="flex w-full mt-2 mb-8 -mx-2">
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Facebook className="h-6 w-6" color="#16A34A"/>
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Twitter className="h-6 w-6" color="#16A34A"/>
            </div>
            <div className="mx-2 bg-white-500 rounded-full items-center justify-center flex p-2 shadow-md">
              <Instagram className="h-6 w-6" color="#16A34A"/>
            </div>
          </div>
          <p className="text-gray-400">©{new Date().getFullYear()} - Zooma</p>
        </div>
        <div className=" row-span-2 sm:col-span-2 sm:col-start-7 sm:col-end-9 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Animals</p>
          <ul className="text-black-500 ">
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Mammals{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Birds{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Invertebrates{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Amphibians{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Reptiles{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-9 sm:col-end-11 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">News</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Pin News{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              UnPin News{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Latest News{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Oldest News{" "}
            </li>
          </ul>
        </div>
        <div className="row-span-2 sm:col-span-2 sm:col-start-11 sm:col-end-13 flex flex-col">
          <p className="text-black-600 mb-4 font-medium text-lg">Profile</p>
          <ul className="text-black-500">
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Your profile{" "}
            </li>
            <li className="my-2 hover:text-primary cursor-pointer transition-all">
              Booking History{" "}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
