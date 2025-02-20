import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

export async function getMyImages() {
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorised");
  }
  const images = await db.query.images.findMany({
    where: (table, { eq }) => {
      return eq(table.userId, user.userId);
    },
    orderBy: (table, { desc }) => {
      return desc(table.id);
    },
  });

  return images;
}

export async function getImage(id: number) {
  // const user = await auth();

  // if (!user.userId) throw new Error("Unauthenticated!");

  const image = await db.query.images.findFirst({
    where: (table, { eq }) => {
      return eq(table.id, id);
    },
  });

  if (!image) {
    throw new Error("Image does not exist!");
  }

  // if (image.userId != user.userId) {
  //   throw new Error("Unauthorised!");
  // }

  return image;
}
