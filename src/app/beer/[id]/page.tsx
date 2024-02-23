import type { Metadata } from "next";
import { ErrorMessage } from "@/components/atoms";
import { BeerDetail, CommentsWrapper } from "@/components/organisms";
import {
  getBeerById,
  getAllBeers,
  getCommentsByBeerId,
} from "@/app/actions/getBeerDetail";
import { Beer } from "@/interfaces";

interface Params {
  params: {
    id: string;
  };
}

export default async function DetailPage({ params }: Params) {
  try {
    const [{ data: beer, status }, comments] = await Promise.all([
      getBeerById(params.id),
      getCommentsByBeerId(params.id),
    ]);

    if (status === "failed") {
      throw new Error("Failed to fetch beer data");
    } else {
      return (
        beer && (
          <div className="grid gap-4">
            <BeerDetail
              status={status}
              beer={beer}
              averageRating={beer.averageRating}
            />
            <CommentsWrapper
              status={status}
              comments={comments.data || []}
              beerId={beer.id}
            />
          </div>
        )
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return <ErrorMessage message={error.message} className="text-xl" />;
    }
  }
}
