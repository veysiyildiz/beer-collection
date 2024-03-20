import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { BeerList, BeerListLoading, Filters } from "@/components/organisms";
import {
  correctSearchParams,
  removeInvalidKeys,
  searchParamsSchema,
} from "@/lib/utils";
import { SearchParams } from "@/types";

type HomePageProps = {
  searchParams: SearchParams;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  let correctedSearchParams = correctSearchParams(searchParams);
  const { correctedSearchParams: validSearchParams, hasInvalidKey } =
    removeInvalidKeys(correctedSearchParams);

  if (hasInvalidKey || !searchParamsSchema.safeParse(searchParams).success) {
    const params = Object.entries(validSearchParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    redirect(`?${params}`);
    return null;
  }

  return (
    <>
      <Filters searchParams={validSearchParams} />
      <Suspense fallback={<BeerListLoading />}>
        <BeerList searchParams={validSearchParams} />
      </Suspense>
    </>
  );
}
