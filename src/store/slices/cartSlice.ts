import { CartItem } from "@/types/CartItemWithProduct";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { cartItems: CartItem[] } = {
	cartItems: [],
};

const findKey = (item: Pick<CartItem, "productId" | "amount">) =>
	`${item.productId}__${item.amount ?? "default"}`;

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (
			state,
			action: PayloadAction<
				Omit<CartItem, "id" | "amount"> & { amount?: number }
			>,
		) => {
			const { productId, amount = 1 } = action.payload;
			const key = findKey({ productId, amount });
			const existingCartItem = state.cartItems.find(
				(item) =>
					item.productId === productId && item.amount === amount,
			);

			if (existingCartItem) {
				existingCartItem.amount += amount;
			} else {
				state.cartItems.push({
					...action.payload,
					id: key,
					amount,
				});
			}
		},
		removeFromCart: (state, action: PayloadAction<string>) => {
			state.cartItems = state.cartItems.filter(
				(item) => item.id !== action.payload,
			);
		},
		updateCartItemAmount: (
			state,
			action: PayloadAction<{ id: string; amount: number }>,
		) => {
			const { id, amount } = action.payload;
			const cartItem = state.cartItems.find((item) => item.id === id);

			if (!cartItem) return;
			console.log(action.payload, "products!!!");
			if (amount <= 0) {
				state.cartItems = state.cartItems.filter(
					(item) => item.id !== id,
				);
			} else {
				cartItem.amount = amount;
			}
		},
		clearCart: (state) => {
			state.cartItems = [];
		},
		hydrateCart: (state, action: PayloadAction<CartItem[]>) => {
			state.cartItems = action.payload;
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	updateCartItemAmount,
	clearCart,
	hydrateCart,
} = cartSlice.actions;
export default cartSlice.reducer;
