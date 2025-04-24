import {
  INFINITE_SCROLL_FEED_INITIAL,
  INFINITE_SCROLL_GRID_INITIAL,
  generateOgImageMetaForPhotos,
} from "@/photo";
import PhotosEmptyState from "@/photo/PhotosEmptyState";
import { Metadata } from "next/types";
import { cache } from "react";
import { getPhotos } from "@/photo/db/query";
import { GRID_HOMEPAGE_ENABLED } from "@/app/config";
import { NULL_CATEGORY_DATA } from "@/category/data";
import PhotoFeedPage from "@/photo/PhotoFeedPage";
import PhotoGridPage from "@/photo/PhotoGridPage";
import { getDataForCategoriesCached } from "@/category/cache";
import { getPhotosMetaCached } from "@/photo/cache";
import LoadingScreen from "@/components/LoadingScreen";

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
  return <LoadingScreen />;
}
