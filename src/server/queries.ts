import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { images } from "./db/schema";
import { redirect } from "next/navigation";

export async function getMyImages() {
  const user = auth();

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
  const user = auth();

  if (!user.userId) throw new Error("Unauthenticated!");

  const image = await db.query.images.findFirst({
    where: (table, { eq }) => {
      return eq(table.id, id);
    },
  });

  if (!image) {
    throw new Error("Image does not exist!");
  }

  if (image.userId != user.userId) {
    throw new Error("Unauthorised!");
  }

  return image;
}

export async function deleteImage(id: number) {
  "use server";
  const user = await auth();

  if (!user.userId) {
    throw new Error("Unauthorised");
  }

  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, user.userId)));

  console.log(`Image ${id} has been deleted! Redirecting now...`);

  redirect("/");
}
