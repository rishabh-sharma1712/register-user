import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TFormData } from "./FormContext";

export interface User extends TFormData {
  userData: TFormData;
}

const initialState: User[] = [];  
  
  const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
      addUser: (state, action) => {
        state.push(action.payload);
      },
    },
  });

export const {addUser} = userSlice.actions
export default userSlice.reducer