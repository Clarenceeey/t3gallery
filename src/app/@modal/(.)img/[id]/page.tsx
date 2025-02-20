import { Modal } from "./modal";
import FullPageImageView from "~/components/full-page-image";

export default function PhotoModal({ params }: { params: { id: string } }) {
  const photoId = params.id;
  const idAsNum = Number(photoId);

  return (
    <Modal>
      <FullPageImageView photoId={idAsNum} />
    </Modal>
  );
}
