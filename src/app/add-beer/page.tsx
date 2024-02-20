import React from "react";
import BeerForm from "@/components/organisms/BeerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Beer",
  description: "Add a new beer to the list",
};

export default function AddBeerPage() {
  return (
    <>
      <BeerForm />
    </>
  );
}
