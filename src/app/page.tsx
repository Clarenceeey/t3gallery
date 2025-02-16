import Link from "next/link";
import { db } from "../server/db/index";

export const dynamic = "force-dynamic";

// const mockUrls = [
//   "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDCnbJpkvu6ywLNi3KqG2TxJVpgZoHvQrb410P",
//   "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDyGJUdJRrdHFJBEYsa8qg0ZIRSAcmDUoVf4vn",
//   "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDhZZiWSeLvWNhVgTsZPjYe3Hkl8QdRGXBiL0O",
//   "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDuuNSdj0ktlyab9Juswep5j1nmLWdrKF7BDGM",
//   "https://i0clmmtpj6.ufs.sh/f/6bMelTC7aZLDpsAwcCknVKNb1ThCABIy57d6aPL3O9jwmH4W",
// ];

// const mockImages = mockUrls.map((url, index) => ({
//   id: index + 1,
//   url,
// }));

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (table, { desc }) => {
      return desc(table.id);
    },
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="flex w-52 flex-col p-4 text-center">
            <img src={image.url} alt="image" className="h-auto" />
            <div>{image.name}</div>
          </div>
        ))}
      </div>
      Hello (gallery in progress)
    </main>
  );
}
