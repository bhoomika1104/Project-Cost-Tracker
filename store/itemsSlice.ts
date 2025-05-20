import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Item {
  id: string;
  name: string;
  cost: number;
}

interface ItemsState {
  items: Item[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    updateItem(state, action: PayloadAction<Item>) {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const { addItem, updateItem, removeItem } = itemsSlice.actions;
export default itemsSlice.reducer;
