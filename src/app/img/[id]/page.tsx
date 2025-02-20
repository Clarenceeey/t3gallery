import FullPageImageView from "~/components/full-page-image";

export default function PhotoPage({ params }: { params: { id: string } }) {
  const photoId = params.id;
  const idAsNum = Number(photoId);

  return <FullPageImageView photoId={idAsNum} />;
}
