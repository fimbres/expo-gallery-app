import { TypedUseSelectorHook, useSelector } from 'react-redux';

import type { RootState } from '../state/stores/photos-store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
