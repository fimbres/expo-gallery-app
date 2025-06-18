import feedReducer, {
  fetchAllPhotos,
  clearFeed,
} from './feed-slice';
import { UnsplashPhoto } from '../../types/unsplash';
import * as service from '../../services/unsplash';
import { mockPhotos } from '../../mocks/photos';

describe('Feed Slice', () => {
  const initialState = {
    photos: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(feedReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('clearFeed method resets state', () => {
    const populated = {
      ...initialState,
      photos: [{ id: '1' } as UnsplashPhoto],
      page: 5,
      hasMore: false,
    };
    expect(feedReducer(populated, clearFeed())).toEqual(initialState);
  });

  describe('fetchAllPhotos thunk', () => {
    beforeEach(() => {
      jest.spyOn(service, 'getAllPhotos').mockResolvedValue(mockPhotos);
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('handles pending → loading true', () => {
      const action = { type: fetchAllPhotos.pending.type };
      const state = feedReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('handles fulfilled with data', () => {
      const action = {
        type: fetchAllPhotos.fulfilled.type,
        payload: mockPhotos,
      };
      const state = feedReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.photos).toEqual(mockPhotos);
      expect(state.page).toBe(2);
      expect(state.hasMore).toBe(true);
    });

    it('handles fulfilled with empty payload (no more pages)', () => {
      const action = {
        type: fetchAllPhotos.fulfilled.type,
        payload: [],
      };
      const state = feedReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.hasMore).toBe(false);
    });

    it('handles rejected', () => {
      const action = {
        type: fetchAllPhotos.rejected.type,
        error: { message: 'fail' },
      };
      const state = feedReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('fail');
    });
  });
});
