import type { Metadata } from "next";
import { ErrorMessage } from "@/components/atoms";
import { BeerDetail, CommentsWrapper } from "@/components/organisms";
import { getBeerById, getCommentsByBeerId } from "@/app/actions";
import { Beer } from "@/types";

type Params = {
  params: {
    id: string;
  };
};

export default async function DetailPage({ params }: Params) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  try {
    const [{ data: beer }, comments] = await Promise.all([
      getBeerById(params.id),
      getCommentsByBeerId(params.id),
    ]);

    return (
      <div className="grid gap-4">
        <BeerDetail beer={beer} />
        <CommentsWrapper comments={comments.data || []} beerId={params.id} />
      </div>
    );
  } catch (error) {
    return <ErrorMessage message="Beer Not Found" />;
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  try {
    const { data: beer } = await getBeerById(params.id);
    return {
      title: beer?.name,
      description: beer?.tagline,
    };
  } catch (error) {
    return {
      title: "Beer Not Found",
      description: "Beer Not Found",
    };
  }
}
