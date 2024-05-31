import {configureStore} from "@reduxjs/toolkit";
import AppStateReducer from "./slices/AppState-slice.ts";
import AlertReducer from "./slices/AlertsState_slice.ts";

const store = configureStore({
    reducer:{
        AppStateReducer:AppStateReducer,
        AlertStateReducer:AlertReducer
    }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatcher = typeof store.dispatch;
