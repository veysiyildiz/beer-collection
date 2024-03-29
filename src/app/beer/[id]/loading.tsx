import { CommentSkeleton } from "@/components/molecules";
import { BeerDetailSkeleton } from "@/components/organisms";

export default function Loading() {
  return (
    <>
      <BeerDetailSkeleton />
      <CommentSkeleton />
    </>
  );
}
