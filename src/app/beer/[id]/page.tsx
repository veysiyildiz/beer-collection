import { ErrorMessage } from "@/components/atoms";
import { BeerDetail, CommentsWrapper } from "@/components/organisms";
import {
  getBeerById,
  getAllBeers,
  getCommentsByBeerId,
} from "@/app/actions/getBeerDetail";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [{ data: beer, status }, comments] = await Promise.all([
    getBeerById(params.id),
    getCommentsByBeerId(params.id),
  ]);

  if (status === "failed") {
    return <ErrorMessage message={error} className="text-xl" />;
  } else {
    return (
      <>
        <div className="grid gap-4">
          <BeerDetail
            status={status}
            beer={beer}
            averageRating={beer.averageRating}
          />
          <CommentsWrapper
            status={status}
            comments={comments}
            beerId={beer.id}
          />
        </div>
      </>
    );
  }
}

export async function generateMetadata({ params }: Params): Metadata {
  const { data: beer } = await getBeerById(params.id);

  if (!beer) {
    return notFound();
  }

  return {
    title: beer.name,
    description: beer.tagline,
  };
}

export async function generateStaticParams() {
  const beers = await getAllBeers();

  return beers.map((beer) => ({
    id: beer.id,
  }));
}
