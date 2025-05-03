import {
  INFINITE_SCROLL_FEED_INITIAL,
  INFINITE_SCROLL_GRID_INITIAL,
  generateOgImageMetaForPhotos,
} from "@/photo";
import { Metadata } from "next/types";
import { cache } from "react";
import { getPhotos } from "@/photo/db/query";
import { GRID_HOMEPAGE_ENABLED } from "@/app/config";
import LoadingScreen from "@/components/LoadingScreen";
import { getPhotosMetaCached } from "@/photo/cache";
import Link from "next/link";

export const dynamic = "force-static";
export const maxDuration = 60;

const getPhotosCached = cache(() =>
  getPhotos({
    limit: GRID_HOMEPAGE_ENABLED
      ? INFINITE_SCROLL_GRID_INITIAL
      : INFINITE_SCROLL_FEED_INITIAL,
  })
);

export async function generateMetadata(): Promise<Metadata> {
  const photos = await getPhotosCached().catch(() => []);
  return generateOgImageMetaForPhotos(photos);
}

export default function HomePage() {
  return (
    <>
      <LoadingScreen />
      <Link href="/" className="nav-link">
        Home
      </Link>
    </>
  );
}
