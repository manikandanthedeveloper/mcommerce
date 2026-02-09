import { Prisma } from "@/generated";

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
	include: {
		product: true;
	};
}>;

export type actionFunction = (
	prevState: unknown,
	formData: FormData,
) => Promise<{ message: string }>;

export type CartItem = {
	id?: string;
	productId: string;
	image: string;
	title: string;
	price: string;
	amount: number;
};

export type CartState = {
	cartItems: CartItem[];
	numItemsInCart: number;
	cartTotal: number;
	shipping: number;
	tax: number;
	orderTotal: number;
};
