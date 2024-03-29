import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { BeerList, BeerListLoading, Filters } from "@/components/organisms";
import { correctSearchParams, removeInvalidKeys } from "@/lib/utils";
import { SearchParams } from "@/types";
import { SearchParamsValidation } from "@/lib/validations";

type HomePageProps = {
  searchParams: SearchParams;
};

type KeyParamsType = Omit<SearchParams, "page"> &
  Partial<Pick<SearchParams, "page">>;

export default async function HomePage({ searchParams }: HomePageProps) {
  let correctedSearchParams = correctSearchParams(searchParams);
  const { correctedSearchParams: validSearchParams, hasInvalidKey } =
    removeInvalidKeys(correctedSearchParams);

  if (
    hasInvalidKey ||
    !SearchParamsValidation.safeParse(searchParams).success
  ) {
    const params = Object.entries(validSearchParams)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    redirect(`?${params}`);
    return null;
  }

  const keyParams: KeyParamsType = { ...validSearchParams };
  delete keyParams.page;

  return (
    <>
      <Filters searchParams={validSearchParams} />
      <Suspense key={JSON.stringify(keyParams)} fallback={<BeerListLoading />}>
        <BeerList searchParams={validSearchParams} />
      </Suspense>
    </>
  );
}
