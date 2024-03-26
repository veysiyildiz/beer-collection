"use client";

import React from "react";
import { toast } from "react-hot-toast";
import { addBeer } from "@/app/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "@/components/organisms";
import { Beer } from "@/types";
import { SubmitButton } from "@/components/molecules";

const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  tagline: z.string().nonempty({ message: "Tagline is required" }),
  first_brewed: z.string().nonempty({ message: "First brewed is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  image_url: z.string().nonempty({ message: "Image URL is required" }),
  id: z.string().nonempty({ message: "ID is required" }),
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

type FormType = Omit<Beer, "food_pairing"> & { food_pairing: string };

const BeerForm: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(schema),
  });

  const defaultImageUrl = "https://picsum.photos/200/300";

  const addBeerClientAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    const beer: Beer = {
      abv: Number(data.abv),
      brewers_tips: data.brewers_tips.toString(),
      contributed_by: data.contributed_by.toString(),
      description: data.description.toString(),
      first_brewed: data.first_brewed.toString(),
      id: data.id.toString(),
      image_url: data.image_url.toString(),
      name: data.name.toString(),
      tagline: data.tagline.toString(),
      food_pairing: data.food_pairing.toString().split("\n"),
      averageRating: 0,
    };

    try {
      const response = await addBeer(beer);
      toast.success("Beer added successfully");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "Error adding beer";
      toast.error(errorMessage);
    }
  };

  return (
    <form action={addBeerClientAction} className="w-full max-w-lg p-4 mx-auto">
      <input type="hidden" {...register("id")} value={Date.now().toString()} />
      <input type="hidden" {...register("image_url")} value={defaultImageUrl} />

      <FormField
        id="name"
        register={register}
        errors={errors}
        label="Name"
        placeholder="Beer Name"
      />
      <FormField
        id="tagline"
        register={register}
        errors={errors}
        label="Tagline"
        placeholder="Tagline"
      />
      <FormField
        id="abv"
        register={register}
        errors={errors}
        label="Alcohol By Volume"
        placeholder="abv"
        type="number"
      />
      <FormField
        id="first_brewed"
        register={register}
        errors={errors}
        label="First Brewed"
        placeholder="YYYY-MM"
      />
      <FormField
        id="description"
        register={register}
        errors={errors}
        label="Description"
        placeholder="Enter description"
        isTextArea
      />
      <FormField
        id="food_pairing"
        register={register}
        errors={errors}
        label="Food Pairing"
        placeholder="Enter food pairing, one per line"
        isTextArea
      />
      <FormField
        id="brewers_tips"
        register={register}
        errors={errors}
        label="Brewers Tips"
        placeholder="Enter brewers tips"
        isTextArea
      />
      <FormField
        id="contributed_by"
        register={register}
        errors={errors}
        label="Contributed By"
        placeholder="Contributed By"
      />

      <SubmitButton>Add Beer</SubmitButton>
    </form>
  );
};

export default BeerForm;
