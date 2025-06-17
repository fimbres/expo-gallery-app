import { useDispatch } from 'react-redux';

import type { AppDispatch } from '../state/stores/photos-store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
