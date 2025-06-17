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
  hasMore: false,
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
      state.hasMore = false;
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
          state.photos = [...state.photos, ...payload];
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
