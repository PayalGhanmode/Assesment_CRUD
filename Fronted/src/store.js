import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import LoginUser from "./Reducers/LoginUser";
import userSlice from "./Reducers/userSlice";

const rootReducer = combineReducers({
  loginUser: LoginUser,
  userData: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistore = persistStore(store);
export { store, persistore };