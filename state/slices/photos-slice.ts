import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAllPhotos } from '../../services/unsplash';
import { UnsplashPhoto } from '../../types/unsplash';

interface PhotosState {
  photos: UnsplashPhoto[];
  page: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PhotosState = {
  photos: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

export const fetchPhotosPage = createAsyncThunk<
  UnsplashPhoto[],
  void,
  { state: { photos: PhotosState } }
>('photos/fetchPage', async (_, thunkAPI) => {
  const state = thunkAPI.getState().photos;
  const nextPage = state.page;
  return await getAllPhotos(nextPage);
});

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    resetPhotos(state) {
      state.photos = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPhotosPage.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotosPage.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload.length === 0) {
          state.hasMore = false;
        } else {
          // bug fix: the unsplash API sometimes returns duplicated images between pages.
          const existingIds = new Set(state.photos.map(p => p.id));
          const newPhotos = payload.filter(p => !existingIds.has(p.id));

          state.photos = [...state.photos, ...newPhotos];
          state.page += 1;
        }
      })
      .addCase(fetchPhotosPage.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Unexpected error while loading photos.';
      });
  },
});

export const { resetPhotos } = photosSlice.actions;
export default photosSlice.reducer;
