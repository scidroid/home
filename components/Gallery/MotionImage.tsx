/* eslint-disable jsx-a11y/alt-text */
"use client";

import Image, { ImageProps } from "next/image";

import { forwardRef } from "react";

import { motion } from "framer-motion";


const ImagePrimitive = forwardRef<HTMLImageElement, ImageProps>(
  (props, ref) => <Image ref={ref} {...props} />
);

ImagePrimitive.displayName = "ImagePrimitive";

export const MotionImage = motion(ImagePrimitive);
