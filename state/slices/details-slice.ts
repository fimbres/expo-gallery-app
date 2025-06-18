import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getPhotoDetails } from '../../services/unsplash';

import { UnsplashPhoto } from '../../types/unsplash';
import { RootState } from '../stores/photos-store';

export const fetchPhotoDetails = createAsyncThunk<
  UnsplashPhoto, 
  string, 
  { state: RootState }
>(
  'details/fetchById',
  async (id, _) => {
    return await getPhotoDetails(id);
  }
);

interface DetailsState {
  photo: UnsplashPhoto | null;
  loading: boolean;
  error: string | null;
}

const initialState: DetailsState = { photo: null, loading: false, error: null };

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPhotoDetails.pending, state => { state.loading = true; state.error = null; })
      .addCase(fetchPhotoDetails.fulfilled, (state, { payload }) => {
        state.photo = payload;
        state.loading = false;
      })
      .addCase(fetchPhotoDetails.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Unexpected error while loading the photo.';
      });
  }
});

export default detailsSlice.reducer;
