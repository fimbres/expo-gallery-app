import { createSelector } from '@reduxjs/toolkit';

import { UnsplashPhoto } from '../../types/unsplash';
import { RootState } from '../stores/photos-store';

export const selectPhotoById = createSelector(
  [
    (state: RootState) => state.feed.photos,
    (state: RootState) => state.search.photos,
    (_: RootState, id: string) => id,
  ],
  (feedPhotos, searchPhotos, id): UnsplashPhoto | undefined =>
    feedPhotos.find(p => p.id === id) || searchPhotos.find(p => p.id === id)
);
