"use server";

import prisma from "@/lib/prisma";

import { auth, currentUser } from "@clerk/nextjs/server";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { reviewSchema, validateWithZodSchema } from "./schemas";
import { redirect } from "next/navigation";
import { Cart } from "@/generated";

const getAuthUser = async () => {
	const user = await currentUser();

	if (!user) {
		toast.error("You must be logged in to perform this action");
		throw new Error("Unauthorized");
	}
	return user;
};

const getAdminUser = async () => {
	const user = await getAuthUser();
	if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
	return user;
};

const renderError = (error: unknown): { message: string } => {
	return {
		message: error instanceof Error ? error.message : "an error occurred",
	};
};

export const fetchFeaturedProducts = async () => {
	const products = await prisma.product.findMany({
		where: {
			featured: true,
			isNew: false,
		},
		take: 10,
	});

	return products;
};

export const fetchNewProducts = async () => {
	const products = await prisma.product.findMany({
		orderBy: { createdAt: "desc" },
		where: { isNew: true },
		take: 10,
	});
	return products;
};

export const fetchAllProducts = async () => {
	const products = await prisma.product.findMany();
	return products;
};

export const fetchProductById = async (id: string) => {
	const product = await prisma.product.findUnique({
		where: { id },
	});
	return product;
};

export const fetchProductBySlug = async (slug: string) => {
	const product = await prisma.product.findUnique({
		where: { slug },
	});
	return product;
};

export const fetchProductsByCategory = async (slug: string) => {
	const category = await prisma.category.findUnique({
		where: { slug },
		select: { id: true },
	});

	if (!category) {
		return [];
	}

	const products = await prisma.product.findMany({
		where: { categoryId: category.id },
	});

	return products;
};

export const fetchAllCategories = async () => {
	const categories = await prisma.category.findMany();
	return categories;
};

export const fetchCategoryById = async (id: string) => {
	const category = await prisma.category.findUnique({
		where: { id },
	});
	return category;
};

export const fetchCategoryBySlug = async (slug: string) => {
	const category = await prisma.category.findUnique({
		where: { slug },
	});
	return category;
};

export const searchProducts = async (query: string) => {
	if (!query || query.trim().length === 0) {
		return [];
	}

	const products = await prisma.product.findMany({
		where: {
			OR: [
				{ name: { contains: query, mode: "insensitive" } },
				{ description: { contains: query, mode: "insensitive" } },
			],
		},
		take: 8,
	});

	return products;
};

export const fetchFavoriteId = async ({ productId }: { productId: string }) => {
	const user = await getAuthUser();
	const favorite = await prisma.favourite.findFirst({
		where: {
			productId,
			clerkId: user.id,
		},
		select: {
			id: true,
		},
	});
	return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
	productId: string;
	favoriteId: string | null;
	pathname: string;
}) => {
	const user = await getAuthUser();
	const { productId, favoriteId, pathname } = prevState;

	try {
		if (favoriteId) {
			await prisma.favourite.delete({
				where: {
					id: favoriteId,
				},
			});
		} else {
			await prisma.favourite.create({
				data: {
					productId,
					clerkId: user.id,
				},
			});
		}
		revalidatePath(pathname);
		return {
			message: favoriteId ? "removed from faves" : "added to faves",
		};
	} catch (error) {
		return renderError(error);
	}
};

export const fetchUserFavorites = async () => {
	const user = await getAuthUser();
	const favorites = await prisma.favourite.findMany({
		where: {
			clerkId: user.id,
		},
		include: {
			product: true,
		},
	});
	return favorites;
};

export const createReviewAction = async (
	prevState: unknown,
	formData: FormData,
) => {
	const user = await getAuthUser();

	try {
		const rawData = Object.fromEntries(formData);
		const validatedFields = validateWithZodSchema(reviewSchema, rawData);
		await prisma.review.create({
			data: {
				...validatedFields,
				clerkId: user.id,
			},
		});
		revalidatePath(`/products/${validatedFields.productId}`);
		return {
			message: "Review submitted successfully",
		};
	} catch (error) {
		toast.error(
			error instanceof Error ? error.message : "Failed to submit review",
		);
		return renderError(error);
	}
};

export const fetchProductReviews = async (productId: string) => {
	const reviews = await prisma.review.findMany({
		where: { productId },
		orderBy: { createdAt: "desc" },
	});
	return reviews;
};
export const fetchProductRating = async (productId: string) => {
	const reviews = await prisma.review.groupBy({
		where: { productId },
		by: ["productId"],
		_avg: { rating: true },
		_count: {
			rating: true,
			id: true,
		},
	});
	return {
		rating: reviews[0]?._avg.rating?.toFixed(1) ?? 0,
		count: reviews[0]?._count.rating ?? 0,
	};
};
export const fetchProductReviewsByUser = async () => {
	const user = await getAuthUser();
	const reviews = await prisma.review.findMany({
		where: { clerkId: user.id },
		orderBy: { createdAt: "desc" },
		select: {
			id: true,
			rating: true,
			comment: true,
			createdAt: true,
			product: {
				select: {
					image: true,
					name: true,
					slug: true,
				},
			},
		},
	});
	return reviews;
};
export const deleteReviewAction = async (prevState: { reviewId: string }) => {
	const { reviewId } = prevState;
	const user = await getAuthUser();
	try {
		const result = await prisma.review.deleteMany({
			where: {
				id: reviewId,
				clerkId: user.id,
			},
		});
		if (result.count === 0) {
			return { message: "Review not found" };
		}
		revalidatePath("/myaccount/reviews");
		return { message: "review deleted successfully" };
	} catch (error) {
		return renderError(error);
	}
};
export const findExistingReview = async (userId: string, productId: string) => {
	return prisma.review.findFirst({
		where: {
			clerkId: userId,
			productId,
		},
	});
};
export const fetchCartItems = async () => {
	const { userId } = await auth();

	const cart = await prisma.cart.findFirst({
		where: {
			clerkId: userId!,
		},
		select: {
			numItemsInCart: true,
		},
	});
	return cart?.numItemsInCart || 0;
};
const fetchProduct = async (productId: string) => {
	const product = await prisma.product.findUnique({
		where: {
			id: productId,
		},
	});
	if (!product) {
		throw new Error("Product not found");
	}
	return product;
};

const includeProductClause = {
	cartItems: {
		include: {
			product: true,
		},
	},
};

export const fetchOrCreateCart = async ({
	userId,
	errorOnFailure = false,
}: {
	userId: string;
	errorOnFailure?: boolean;
}) => {
	const cart = await prisma.cart.findMany({
		where: {
			clerkId: userId,
		},
		include: includeProductClause,
	});
	if (cart.length === 0 && errorOnFailure) {
		throw new Error("Cart not found");
	}
	if (cart.length === 0) {
		const newCart = await prisma.cart.create({
			data: {
				clerkId: userId,
			},
			include: includeProductClause,
		});
		return newCart;
	}
	return cart[0];
};

const updateOrCreateCartItem = async ({
	productId,
	cartId,
	amount,
}: {
	productId: string;
	cartId: string;
	amount: number;
}) => {
	let cartItem = await prisma.cartItem.findFirst({
		where: {
			productId,
			cartId,
		},
	});
	if (cartItem) {
		cartItem = await prisma.cartItem.update({
			where: {
				id: cartItem.id,
			},
			data: {
				amount: cartItem.amount + amount,
			},
		});
	} else {
		cartItem = await prisma.cartItem.create({
			data: { amount, productId, cartId },
		});
	}
};

export const updateCart = async (cart: Cart) => {
	const cartItems = await prisma.cartItem.findMany({
		where: {
			cartId: cart.id,
			amount: {
				gt: 0, // Only fetch items with quantity greater than 0
			},
		},
		include: {
			product: true,
		},
		orderBy: {
			createdAt: "asc",
		},
	});

	// Delete any cart items with 0 or negative amounts
	await prisma.cartItem.deleteMany({
		where: {
			cartId: cart.id,
			amount: {
				lte: 0,
			},
		},
	});

	let numItemsInCart = 0;
	let cartTotal = 0;

	for (const item of cartItems) {
		numItemsInCart += item.amount;
		cartTotal += item.amount * item.product.price;
	}
	const tax = cart.taxRate * cartTotal;
	const shipping = cartTotal ? cart.shipping : 0;
	const orderTotal = cartTotal + tax + shipping;

	const currentCart = await prisma.cart.update({
		where: {
			id: cart.id,
		},
		data: {
			numItemsInCart,
			cartTotal,
			tax,
			orderTotal,
		},
		include: includeProductClause,
	});
	return { cartItems, currentCart };
};

export const addToCartAction = async (
	prevState: unknown,
	formData: FormData,
) => {
	const user = await getAuthUser();
	console.log(formData, "formdata");
	try {
		const productId = formData.get("productId") as string;
		const amount = Number(formData.get("amount"));

		// Validate amount is greater than 0
		if (amount <= 0) {
			return { message: "" };
		}

		await fetchProduct(productId);
		const cart = await fetchOrCreateCart({ userId: user.id });
		await updateOrCreateCartItem({ productId, cartId: cart.id, amount });
		await updateCart(cart);
		revalidatePath("/cart");
		return { message: "Product added to cart" };
	} catch (error) {
		return renderError(error);
	}
};

export const removeCartItemAction = async (
	prevState: unknown,
	formData: FormData,
) => {
	const user = await getAuthUser();
	try {
		const cartItemId = formData.get("id") as string;
		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});
		await prisma.cartItem.delete({
			where: {
				id: cartItemId,
				cartId: cart.id,
			},
		});
		await updateCart(cart);
		revalidatePath("/cart");
		return { message: "Item removed from cart" };
	} catch (error) {
		return renderError(error);
	}
};

export const updateCartItemAction = async ({
	amount,
	cartItemId,
}: {
	amount: number;
	cartItemId: string;
}) => {
	const user = await getAuthUser();
	try {
		const cart = await fetchOrCreateCart({
			userId: user.id,
			errorOnFailure: true,
		});

		await prisma.cartItem.update({
			where: {
				id: cartItemId,
				cartId: cart.id,
			},
			data: {
				amount,
			},
		});
		await updateCart(cart);
		revalidatePath("/cart");
		return { message: "cart updated" };
	} catch (error) {
		return renderError(error);
	}
};

export const createOrderAction = async () =>
	// prevState: unknown,
	// formData: FormData,
	{
		const user = await getAuthUser();
		let orderId: null | string = null;
		let cartId: null | string = null;

		try {
			const cart = await fetchOrCreateCart({
				userId: user.id,
				errorOnFailure: true,
			});
			cartId = cart.id;

			await prisma.order.deleteMany({
				where: {
					clerkId: user.id,
					isPaid: false,
				},
			});

			const order = await prisma.order.create({
				data: {
					clerkId: user.id,
					products: cart.numItemsInCart,
					orderTotal: cart.orderTotal,
					tax: cart.tax,
					shipping: cart.shipping,
					email: user.emailAddresses[0].emailAddress,
				},
			});
			orderId = order.id;
		} catch (error) {
			return renderError(error);
		}
		redirect(`/checkout?orderId=${orderId}&cartId=${cartId}`);
	};

export const fetchUserOrders = async () => {
	const user = await getAuthUser();
	const orders = await prisma.order.findMany({
		where: {
			clerkId: user.id,
			isPaid: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return orders;
};

export const fetchAdminOrders = async () => {
	await getAdminUser();

	const orders = await prisma.order.findMany({
		where: {
			isPaid: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return orders;
};