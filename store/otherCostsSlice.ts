import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface OtherCost {
  id: string;
  description: string;
  amount: number;
}

interface OtherCostsState {
  otherCosts: OtherCost[];
}

const initialState: OtherCostsState = {
  otherCosts: [],
};

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState,
  reducers: {
    addOtherCost(state, action: PayloadAction<OtherCost>) {
      state.otherCosts.push(action.payload);
    },
    updateOtherCost(state, action: PayloadAction<OtherCost>) {
      const index = state.otherCosts.findIndex(cost => cost.id === action.payload.id);
      if (index !== -1) {
        state.otherCosts[index] = action.payload;
      }
    },
    removeOtherCost(state, action: PayloadAction<string>) {
      state.otherCosts = state.otherCosts.filter(cost => cost.id !== action.payload);
    },
  },
});

export const { addOtherCost, updateOtherCost, removeOtherCost } = otherCostsSlice.actions;
export default otherCostsSlice.reducer;
