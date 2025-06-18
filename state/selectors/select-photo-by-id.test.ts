import { selectPhotoById } from './select-photo-by-id';
import { RootState } from '../stores/photos-store';
import { UnsplashPhoto } from '../../types/unsplash';

describe('selectPhotoById', () => {
  const photoA = { id: 'A' } as UnsplashPhoto;
  const photoB = { id: 'B' } as UnsplashPhoto;

  const state: RootState = {
    feed: { photos: [photoA], page:1, hasMore:true, loading:false, error:null },
    search: { photos: [photoB], page:1, hasMore:true, searchQuery:'', loading:false, error:null },
    details: { photo: null, loading:false, error:null },
  };

  it('finds photo in feed', () => {
    expect(selectPhotoById(state, 'A')).toBe(photoA);
  });

  it('falls back to search if not in feed', () => {
    expect(selectPhotoById(state, 'B')).toBe(photoB);
  });

  it('returns undefined if nowhere found', () => {
    expect(selectPhotoById(state, 'Z')).toBeUndefined();
  });

  it('is memoized for same args', () => {
    const sel1 = selectPhotoById(state, 'A');
    const sel2 = selectPhotoById(state, 'A');

    expect(sel1).toBe(sel2);
  });
});
