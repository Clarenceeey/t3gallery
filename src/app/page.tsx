import Link from "next/link";
import { db } from "../server/db/index";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDCnbJpkvu6ywLNi3KqG2TxJVpgZoHvQrb410P",
  "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDyGJUdJRrdHFJBEYsa8qg0ZIRSAcmDUoVf4vn",
  "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDhZZiWSeLvWNhVgTsZPjYe3Hkl8QdRGXBiL0O",
  "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDuuNSdj0ktlyab9Juswep5j1nmLWdrKF7BDGM",
  "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDpsAwcCknVKNb1ThCABIy57d6aPL3O9jwmH4W",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => {
          return <div key={post.id}>{post.name}</div>;
        })}
        {[...mockImages].map((image) => (
          <div key={image.id} className="w-48 p-4">
            <img src={image.url} alt="image" className="h-auto w-40" />
          </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}
