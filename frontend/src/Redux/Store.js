// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./AuthSlice";
// import storage from "redux-persist/lib/storage";
// import { persistReducer, persistStore } from "redux-persist";
// import { combineReducers } from "redux";

// // Create a persist config
// const persistConfig = {
//     key: 'root',
//     storage,
//     whitelist: ['auth']
// };

// // Combine reducers
// const rootReducer = combineReducers({
//     auth: authReducer
// });

// // Create a persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure store
// export const store = configureStore({
//     reducer: persistedReducer,
// });

// // Create a persistor
// export const persistor = persistStore(store);



import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/FLUSH",
          "persist/PURGE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
