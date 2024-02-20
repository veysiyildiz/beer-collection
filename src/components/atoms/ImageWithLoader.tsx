"use client";

import { useState, useEffect, FC } from "react";
import NextImage from "next/image";
import Skeleton from "react-loading-skeleton";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const ImageWithLoader: FC<ImageWithLoaderProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setStatus("loaded");
    img.onerror = () => setStatus("error");

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return (
    <>
      {status === "loaded" ? (
        <NextImage
          className={className}
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      ) : status === "loading" ? (
        <div className={className}>
          <Skeleton />
        </div>
      ) : (
        <div>Error loading image</div>
      )}
    </>
  );
};

export default ImageWithLoader;
