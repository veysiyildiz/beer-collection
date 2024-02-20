import React from "react";
import { ImageWithLoader } from "@/components/atoms";
import Link from "next/link";

const Logo: React.FC = () => (
  <div className="w-auto flex">
    <Link href="/" aria-label="Home">
      <ImageWithLoader
        src="/impact-logo.png"
        alt="Impact Logo"
        width={164}
        height={64}
      />
    </Link>
  </div>
);

export default Logo;
