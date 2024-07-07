"use client";

import * as React from "react";

import Image from "next/image";

export default function Logo() {
  return (
    <>
      <div className="flex items-center space-x-2 lg:space-x-4">
        <Image
          width={200}
          height={50}
          src={"/images/wasac_logo.png"}
          alt="WASAC Logo"
        />

        <p className="text-2xl font-medium transition-colors hover:text-primary">
          
        </p>
      </div>
    </>
  );
}
