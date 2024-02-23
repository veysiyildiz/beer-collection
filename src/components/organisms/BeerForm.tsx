"use client";

import React, { useEffect, useState } from "react";
import { addBeer } from "@/app/actions/getBeers";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Input,
  Button,
  Label,
  TextArea,
  ErrorMessage,
} from "@/components/atoms";
import { Beer } from "@/interfaces";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  tagline: z.string().nonempty({ message: "Tagline is required" }),
  first_brewed: z.string().nonempty({ message: "First brewed is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  image_url: z.string().nonempty({ message: "Image URL is required" }),
  abv: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((value) => value >= 0, {
      message: "ABV must be a non-negative number",
    }),
  food_pairing: z.string().nonempty({ message: "Food pairing is required" }),
  brewers_tips: z.string().nonempty({ message: "Brewers tips is required" }),
  contributed_by: z
    .string()
    .nonempty({ message: "Contributed by is required" }),
});

type FormData = Omit<Beer, "food_pairing"> & { food_pairing: string };

const BeerForm: React.FC = () => {
  const router = useRouter();
  const [newBeer, setNewBeer] = useState<Beer | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue("image_url", defaultImageUrl);
  }, [setValue]);

  useEffect(() => {
    if (newBeer) {
      router.push(`/beer/${newBeer.id}`);
    }
  }, [router, newBeer]);

  const defaultImageUrl = "https://picsum.photos/200/300";

  const onSubmit = async (data: FormData) => {
    const beer: Beer = {
      ...data,
      id: Date.now().toString(),
      food_pairing: data.food_pairing.split("\n"),
    };
    ("use server");
    await addBeer(beer);
    setNewBeer(beer);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg p-4 mx-auto"
    >
      <Label text="Name" htmlFor="name" />
      <Input
        id="name"
        {...register("name", { required: true })}
        placeholder="Beer Name"
      />
      <ErrorMessage message={errors.name?.message} />

      <Label text="Tagline" htmlFor="tagline" />
      <Input
        id="tagline"
        {...register("tagline", { required: true })}
        placeholder="Tagline"
      />
      <ErrorMessage message={errors.tagline?.message} />

      <Label text="Alcohol By Volume" htmlFor="abv" />
      <Input
        id="abv"
        type="number"
        {...register("abv", { required: true })}
        placeholder="abv"
      />
      <ErrorMessage message={errors.abv?.message} />

      <Label text="First Brewed" htmlFor="first_brewed" />
      <Input
        id="first_brewed"
        {...register("first_brewed", { required: true })}
        placeholder="YYYY-MM"
      />
      <ErrorMessage message={errors.first_brewed?.message} />

      <Label text="Description" htmlFor="description" />
      <TextArea
        id="description"
        {...register("description")}
        placeholder="Enter description"
      />
      <ErrorMessage message={errors.description?.message} />

      <Label text="Food Pairing" htmlFor="food_pairing" />
      <TextArea
        id="food_pairing"
        {...register("food_pairing")}
        placeholder="Enter food pairing, one per line"
      />
      <ErrorMessage message={errors.food_pairing?.message} />

      <Label text="Brewers Tips" htmlFor="brewers_tips" />
      <TextArea
        id="brewers_tips"
        {...register("brewers_tips")}
        placeholder="Enter brewers tips"
      />
      <ErrorMessage message={errors.brewers_tips?.message} />

      <Label text="Contributed By" htmlFor="contributed_by" />
      <Input
        id="contributed_by"
        {...register("contributed_by", { required: true })}
        placeholder="Contributed By"
      />
      <ErrorMessage message={errors.contributed_by?.message} />

      <Button
        className="w-full"
        variant="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Add Beer
      </Button>
    </form>
  );
};

export default BeerForm;