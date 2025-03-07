import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateType } from './types';

const userInitialState: UserStateType = {
  id: 0,
  name: '',
  email: '',
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    registerUser: (state, { payload }: PayloadAction<any>) => {
      state.token = payload?.token;
      state.name = payload?.user?.name;
      state.email = payload?.user?.email;
      state.id = payload?.user?.id;
    },
    setUserDetails: (state, { payload }: PayloadAction<any>) => {
      state.token = payload?.token;
      state.name = payload?.user?.name;
      state.email = payload?.user?.email;
      state.id = payload?.user?.id;
    },
    removeUserdetails: state => {
      return Object.assign(state, userInitialState);
    },
  },
});

export const { registerUser, setUserDetails, removeUserdetails } = userSlice.actions;
export default userSlice.reducer;
