export type CartItem = {
	id?: string;
	productId: string;
	product: {
		id: string;
		name: string;
		image: string;
		price: number;
	};
	amount: number;
	createdAt: Date;
	updatedAt: Date;
};

export type Cart = {
	id?: string;
	clerkId: string;
	cartItems: CartItem[];
	numItemsInCart: number;
	cartTotal: number;
	shipping: number;
	tax: number;
	taxRate: number;
	orderTotal: number;
	createdAt: Date;
	updatedAt: Date;
};
