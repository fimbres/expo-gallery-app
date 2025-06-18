import { configureStore } from "@reduxjs/toolkit";

import feedReducer from "../slices/feed-slice";
import searchReducer from "../slices/search-slice";
import detailsReducer from "../slices/details-slice";

export const store = configureStore({
    reducer: {
        feed: feedReducer,
        search: searchReducer,
        details: detailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
