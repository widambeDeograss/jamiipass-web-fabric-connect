import { createSlice } from "@reduxjs/toolkit";
import { AlertInterface, alertState  } from "../../interfaces/interfaces";

const initialState:AlertInterface[]  = alertState;


function removeAlert(id: number): void {
  initialState.filter(alert => alert.id !== id);
  }

let nextAlertId = 0;

export const AlertStateSplice = createSlice({
   name:'AlertState',
   initialState,
   reducers:{

    addAlert: (state, action) => {
        
        const id = nextAlertId++;
        const { title, message, type } = action.payload;
        
        const duration = 3000
      
        setTimeout(() => {
          removeAlert(id);
          }, duration);

        return [
          ...state,
          { id, title, message, type }
        ]
        
      },


    cancelAlert: (state, action) => {
        const {id} = action.payload;
        const index = state.findIndex(alert => alert.id === id);
        state.splice(index, 1);
    }

    
   }
});

export const { addAlert, cancelAlert } = AlertStateSplice.actions;
export default AlertStateSplice.reducer;