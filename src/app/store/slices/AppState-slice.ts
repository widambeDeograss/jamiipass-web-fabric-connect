import { createSlice } from "@reduxjs/toolkit";
import { appState, appStateInterface } from "../../interfaces/interfaces";

const initialState:appStateInterface = appState;

const getInitialThemeMode = () => {
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return true; // Dark mode
    } else {
      return false; // Light mode
    }
  };

const InnitialAuthentication = () => {
    if (localStorage.getItem("token")){
        initialState.token = localStorage.getItem("token");
        return true
    }else {
        return false
    }

}
  const initialThemeMode = getInitialThemeMode();

  initialState.isDarkMode = initialThemeMode;
  initialState.isUserAuthenticated = InnitialAuthentication();
  initialState.isOrg = localStorage.getItem("isOrg") || "corpn";

export const AppStateSlice = createSlice({
    name:'AppState',
    initialState,
    reducers:{
        toggleThemeMode:(state) => {
          console.log(state.isDarkMode);
            state.isDarkMode = !state.isDarkMode;
        },
        setAuthentication:(state, action) => {
          const {payload} = action;
          state.token = payload.token;
          state.isUserAuthenticated = true;
        },
        logout:(state) => {
            localStorage.clear();
            state.token = null;
          state.isUserAuthenticated = false;
        },
        toogleSidebar:(state) => {
          
            state.siderbar0pen = !state.siderbar0pen;
        },
        toogleIsOrg:(state, action) => { 
          const {payload} = action;
          localStorage.setItem("isOrg", payload?.isOrg)
          state.isOrg = payload?.isOrg;
        }
       
    }
});

export const { toggleThemeMode, setAuthentication, toogleSidebar, toogleIsOrg } = AppStateSlice.actions;
export default AppStateSlice.reducer;
