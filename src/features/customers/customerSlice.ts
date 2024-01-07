import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  nationalId: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    create: {
      prepare(name, nationalId) {
        return {
          payload: {
            name,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.name = action.payload.name;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.name = action.payload;
    },
  },
});

export const { create, updateName } = customerSlice.actions;
export default customerSlice.reducer;
