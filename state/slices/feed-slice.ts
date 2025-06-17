import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getAllPhotos } from '../../services/unsplash';

import { UnsplashPhoto } from '../../types/unsplash';
import { PhotosState } from '../../types/store';
import { RootState } from '../stores/photos-store';

const initialState: PhotosState = {
  photos: [],
  page: 1,
  hasMore: true,
  loading: false,
  error: null,
};

export const fetchAllPhotos = createAsyncThunk<
  UnsplashPhoto[],
  void,
  { state: RootState }
>('feed/getAllPhotos', async (_, thunkAPI) => {
  const { page } = thunkAPI.getState().feed;

  return await getAllPhotos(page);
});

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed(state) {
      state.page = 1;
      state.photos = [];
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllPhotos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPhotos.fulfilled, (state, { payload }) => {
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
      .addCase(fetchAllPhotos.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Unexpected error while loading photos.';
      });
  },
});

export const { clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
