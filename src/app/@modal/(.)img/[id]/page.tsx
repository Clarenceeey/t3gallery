import { getImage } from "~/server/queries";

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  // ❌ Remove the incorrect `await params`
  const photoId = params.id;
  const idAsNum = Number(photoId);
  const image = await getImage(idAsNum);
  console.log("PhotoModal opened with ID:", params.id, image.url);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-4">
        <img src={image.url} className="w-96" />
      </div>
    </div>
  );
}
