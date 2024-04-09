
import { createSlice } from '@reduxjs/toolkit';


export const cartSlice = createSlice({
  name: 'course',
  initialState:{
  courses:[]
  },
  reducers: {
    enRoll: (state, action) => {
      const { course_id } = action.payload;// Assuming payload contains 
      
       
     
    },
    incrementQuantity: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      console.log('index valur',itemIndex)
      if (itemIndex !== -1) {
        state.items[itemIndex].quantity++; // Update quantity immutably
      }
    },
    decrementQuantity: (state, action) => {
      const { itemId } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity--; // Update quantity immutably
      }
    },
    removeFromCart: (state, action) => {
      const productIdToRemove = action.payload.productId;
      state.items = state.items.filter((product) => product.id !== productIdToRemove);
    },
    removeCart:(state=>{
      return [];
    }),
    addToWishlist: (state, action) => {
      const { itemId, item } = action.payload;
      state.wishlist[itemId] = item;
    },
    removeFromWishlist: (state, action) => {
      const { itemId } = action.payload;
      delete state.wishlist[itemId];
    },
  },
});

export const { addToCart, removeFromCart, removeCart, addToWishlist, removeFromWishlist
,incrementQuantity, decrementQuantity} = cartSlice.actions;

export default cartSlice.reducer;
