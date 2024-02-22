"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";

type ParamsObjectMapType = Record<
  string,
  { sortOption: string; order: string }
>;

export const useSearchAndSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortOption = searchParams.get("sortOption") || "";
  const order = searchParams.get("order") || "";
  const initialSearchTerm = searchParams.get("searchTerm") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const paramsObjectMap: ParamsObjectMapType = useMemo(
    () => ({
      "abv&_order=desc": { sortOption: "abv", order: "desc" },
      abv: { sortOption: "abv", order: "asc" },
      "first_brewed&_order=desc": { sortOption: "first_brewed", order: "desc" },
      first_brewed: { sortOption: "first_brewed", order: "asc" },
    }),
    []
  );

  const createParamsObject = useCallback(
    (selectedValue: string) => {
      return paramsObjectMap[selectedValue] || { sortOption: "", order: "asc" };
    },
    [paramsObjectMap]
  );

  const initialSelectedOption = useMemo(() => {
    const selectedValue = `${sortOption}${
      order === "desc" ? "&_order=desc" : ""
    }`;
    return selectedValue;
  }, [sortOption, order]);

  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const createQueryString = useCallback(
    (paramsObject: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);
      Object.entries(paramsObject).forEach(([key, value]) => {
        params.set(key, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  const debouncedSearchChange = useRef(
    debounce((searchTerm) => {
      setSearchTerm(searchTerm);
      const paramsObject = { searchTerm };
      const newSearchParams = createQueryString(paramsObject);
      router.push(pathname + "?" + newSearchParams);
    }, 300)
  ).current;

  useEffect(() => {
    const paramsObject = { searchTerm: searchTerm || "" };
    const newSearchParams = createQueryString(paramsObject);
    router.push(pathname + "?" + newSearchParams);
  }, [searchTerm, createQueryString, router, pathname]);

  useEffect(() => {
    const selectedValue = `${sortOption}${
      order === "desc" ? "&_order=desc" : ""
    }`;
    const paramsObject = createParamsObject(selectedValue);
    const newSearchParams = createQueryString(paramsObject);
    router.push(pathname + "?" + newSearchParams);
    setSelectedOption(selectedValue);
  }, [
    sortOption,
    order,
    createParamsObject,
    createQueryString,
    pathname,
    router,
  ]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    debouncedSearchChange(newSearchTerm);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    const paramsObject = createParamsObject(selectedValue);
    const newSearchParams = createQueryString(paramsObject);
    router.push(pathname + "?" + newSearchParams);
  };

  return {
    searchTerm,
    selectedOption,
    handleSearchChange,
    handleSelectChange,
  };
};
