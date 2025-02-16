import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";

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
