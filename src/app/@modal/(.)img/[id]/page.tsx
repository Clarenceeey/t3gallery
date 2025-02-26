import { Modal } from "./modal";
import FullPageImageView from "~/components/full-page-image";

export default async function PhotoModal({
  params,
}: {
  params: { id: string };
}) {
  const { id: photoId } = await params;
  const idAsNum = Number(photoId);

  return (
    <Modal>
      <FullPageImageView photoId={idAsNum} />
    </Modal>
  );
}
