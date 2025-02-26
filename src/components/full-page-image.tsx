import { deleteImage, getImage } from "~/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default async function FullPageImageView(props: { photoId: string }) {
  const idAsNumber = Number(props.photoId);
  if (Number.isNaN(idAsNumber)) throw new Error("Invalid photo id");
  const image = await getImage(idAsNumber);
  const uploaderInfo = await clerkClient.users.getUser(image.userId);

  return (
    <div className="flex h-full w-full min-w-0 flex-row">
      <div className="flex flex-1 items-center justify-center">
        <img src={image.url} className="object-contain p-[5%]" />
      </div>
      <div className="flex w-1/3 flex-shrink-0 flex-col border-l">
        <div className="border-b p-2 text-center text-lg">{image.name}</div>

        <div className="p-2">
          <span>Uploaded by: </span>
          <span>{uploaderInfo.fullName}</span>
        </div>

        <div className="p-2">
          <span>Created On: </span>
          <span>{new Date(image.createdAt).toLocaleDateString()}</span>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";

              await deleteImage(idAsNumber);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
