import { UnsplashPhoto } from "./unsplash";

export type PhotosState = {
  page: number;
  photos: UnsplashPhoto[];
  hasMore: boolean;
  loading: boolean;
  error: string | null;
};
