import type { Metadata } from "next";
import { ErrorMessage } from "@/components/atoms";
import { BeerDetail, CommentsWrapper } from "@/components/organisms";
import { getBeerById, getCommentsByBeerId } from "@/app/actions/getBeerDetail";
import { Beer } from "@/interfaces";

interface Params {
  params: {
    id: string;
  };
}

export default async function DetailPage({ params }: Params) {
  if (!params.id) {
    return <ErrorMessage message="Invalid beer id" />;
  }
  await new Promise((resolve) => setTimeout(resolve, 500));
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
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { data: beer } = await getBeerById(params.id);
  return {
    title: beer?.name,
    description: beer?.tagline,
  };
}
