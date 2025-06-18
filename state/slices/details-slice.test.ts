import detailsReducer, { fetchPhotoDetails } from './details-slice';
import { UnsplashPhoto } from '../../types/unsplash';
import * as service from '../../services/unsplash';
import { mockPhotos } from '../../mocks/photos';

describe('details slice', () => {
  interface DetailsState {
    photo: UnsplashPhoto | null;
    loading: boolean;
    error: string | null;
  }

  const initialState: DetailsState = {
    photo: null,
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(detailsReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  describe('fetchPhotoDetails thunk', () => {
    beforeEach(() => {
      jest.spyOn(service, 'getPhotoDetails').mockResolvedValue(mockPhotos[0]);
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('handles pending → sets loading true', () => {
      const action = { type: fetchPhotoDetails.pending.type };
      const state = detailsReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('handles fulfilled → sets photo and loading false', () => {
      const action = {
        type: fetchPhotoDetails.fulfilled.type,
        payload: mockPhotos[0],
      };
      const state = detailsReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.photo).toEqual(mockPhotos[0]);
    });

    it('handles rejected → sets error message and loading false', () => {
      const action = {
        type: fetchPhotoDetails.rejected.type,
        error: { message: 'oops' },
      };
      const state = detailsReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('oops');
    });
  });
});
