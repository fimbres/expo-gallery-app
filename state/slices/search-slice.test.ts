import searchReducer, {
  fetchSearchPhotos,
  setQuery,
  clearSearch,
} from './search-slice';
import { UnsplashPhoto } from '../../types/unsplash';
import * as service from '../../services/unsplash';
import { mockPhotos } from '../../mocks/photos';

describe('search slice', () => {
  const initialState = {
    photos: [],
    page: 1,
    hasMore: true,
    searchQuery: '',
    loading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(searchReducer(undefined, { type: '@@INIT' })).toEqual(initialState);
  });

  it('setQuery updates query', () => {
    const state = searchReducer(initialState, setQuery('cats'));
    expect(state.searchQuery).toBe('cats');
  });

  it('clearSearch resets state', () => {
    const populated = {
      ...initialState,
      photos: [{ id: 'x' } as UnsplashPhoto],
      page: 3,
      searchQuery: 'dogs',
      hasMore: false,
    };
    expect(searchReducer(populated, clearSearch())).toEqual(initialState);
  });

  describe('fetchSearchPhotos thunk', () => {
    beforeEach(() => {
      jest.spyOn(service, 'searchPhotos').mockResolvedValue(mockPhotos);
    });
    afterEach(() => jest.restoreAllMocks());

    it('handles pending', () => {
      const action = { type: fetchSearchPhotos.pending.type, meta:{arg:'hello'} };
      const state = searchReducer(initialState, action);
      expect(state.loading).toBe(true);
      expect(state.searchQuery).toBe('hello');
    });

    it('handles fulfilled appending and page increment', () => {
      const action = {
        type: fetchSearchPhotos.fulfilled.type,
        payload: mockPhotos,
      };
      const state = searchReducer(
        { ...initialState, loading: true, searchQuery: 'foo' },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.photos).toEqual(mockPhotos);
      expect(state.page).toBe(2);
      expect(state.hasMore).toBe(true);
    });

    it('handles empty results → hasMore=false', () => {
      const action = {
        type: fetchSearchPhotos.fulfilled.type,
        payload: [],
      };
      const state = searchReducer(
        { ...initialState, loading: true, searchQuery: 'a' },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.hasMore).toBe(false);
    });

    it('handles rejected', () => {
      const action = {
        type: fetchSearchPhotos.rejected.type,
        error: { message: 'err' },
      };
      const state = searchReducer(
        { ...initialState, loading: true },
        action
      );
      expect(state.loading).toBe(false);
      expect(state.error).toBe('err');
    });
  });
});
