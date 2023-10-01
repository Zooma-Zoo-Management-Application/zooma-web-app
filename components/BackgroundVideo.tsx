/* eslint-disable @next/next/no-img-element */
"use client"

import useUIState from "@/stores/ui-store";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

/* eslint-disable @next/next/no-html-link-for-pages */
export default function BackgroundVideo() {
  const { isVideoMuted } = useUIState();
  const videoSrc = "https://firebasestorage.googleapis.com/v0/b/zooma-bf129.appspot.com/o/zooma-background-compress.webm?alt=media&token=8301da11-a5de-4ccc-8054-4e6f6e364f30";

  return (
      <section className="w-full text-white">
        <div className="ml-2 sm:ml-10 flex items-end sm:items-center p-3 pt-20 sm:flex sm:flex-wrap sm:pt-4">
          <div className="video-background fixed z-[-1] h-full w-full top-0 left-0">
            <motion.video
              autoPlay
              loop
              muted={isVideoMuted}
              className="object-cover object-center w-full h-full filter brightness-75"
              src={"/zooma-background.webm"}
            />
          </div>
        </div>
      </section>
  );
}