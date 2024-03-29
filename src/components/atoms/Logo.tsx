"use client";

import React from "react";
import Link from "next/link";
import { Text } from "@/components/atoms";

const Logo: React.FC = () => (
  <div className="w-auto flex">
    <Link href="/" aria-label="Home">
      <Text variant="h1" className="sm:text-3xl text-2xl font-bold">
        BEER COLLECTION
      </Text>
    </Link>
  </div>
);

export default Logo;
