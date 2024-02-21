"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => (
  <div className="w-auto flex">
    <Link href="/" aria-label="Home">
      <Image
        src="/impact-logo.png"
        alt="Impact Logo"
        width={164}
        height={64}
        data-loaded="false"
        onLoad={(event) => {
          event.currentTarget.setAttribute("data-loaded", "true");
        }}
        className="w-auto data-[loaded=false]:bg-gray-100/10"
      />
    </Link>
  </div>
);

export default Logo;
