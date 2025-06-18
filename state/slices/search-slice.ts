import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { searchPhotos } from '../../services/unsplash';

import { UnsplashPhoto } from '../../types/unsplash';
import { PhotosState } from '../../types/store';
import { RootState } from '../stores/photos-store';

type SearchState = PhotosState & { searchQuery: string };

const initialState: SearchState = {
  photos: [],
  page: 1,
  hasMore: true,
  searchQuery: '',
  loading: false,
  error: null,
};

export const fetchSearchPhotos = createAsyncThunk<
  UnsplashPhoto[],
  string,
  { state: RootState }
>('search/searchPhotos', async (query, thunkAPI) => {
  const { page } = thunkAPI.getState().search;

  return await searchPhotos(query, page);
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    clearSearch(state) {
      state.photos = [];
      state.page = 1;
      state.searchQuery = '';
      state.hasMore = true;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchPhotos.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.searchQuery = action.meta.arg;
      })
      .addCase(fetchSearchPhotos.fulfilled, (state, { payload }) => {
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
      .addCase(fetchSearchPhotos.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Unexpected error while loading photos.';
      });
  },
});

export const { clearSearch, setQuery } = searchSlice.actions;
export default searchSlice.reducer;
