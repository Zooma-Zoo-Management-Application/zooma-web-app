/* eslint-disable @next/next/no-html-link-for-pages */

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="fixed w-full flex items-center justify-between sm:mx-0 sm:px-2 border-b-2 z-10">
        <div className="mt-4 inline-block pb-4 pl-8">
          <Link href="/" className="align-middle text-3xl font-bold text-black">
            <Image
              src="/Zooma_Mug.png"
              alt="logo"
              width={75}
              height={50}
              className="inline-block"
            />
          </Link>
          <div className="hidden pl-14 align-middle xl:inline-block">
            <Link href="/" className="pr-12 text-xl text-black">
              Home
            </Link>
            <Link href="/animals" className="pr-12 text-xl text-black">
              Animals
            </Link>
            <Link href="/news" className="pr-12 text-xl text-black">
              News
            </Link>
            <Link href="/contact" className="text-xl text-black">
              Contact
            </Link>
          </div>
        </div>
        <div className="flex items-center">
          <div className="hidden py-1 text-right xl:inline-block">
            <Link
              className="mt-2 inline-flex items-center px-12 py-3 text-lg font-semibold tracking-tighter text-black"
              href="/"
            >
              Log in
            </Link>
            <Link
              className="bg-blue mt-2 inline-flex items-center px-8 py-3 text-lg font-semibold tracking-tighter text-white"
              href="/"
            >
              Request Link demo
            </Link>
          </div>
          <button className="pr-12 pl-4">
            <svg
              className="mr-auto inline-block text-black xl:hidden"
              width="33"
              height="50"
              viewBox="0 0 23 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.892578 10.8691H22.1058"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M0.892578 18.8691H22.1058"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
              <path
                d="M22.1066 14.8688H0.893399"
                stroke="black"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}