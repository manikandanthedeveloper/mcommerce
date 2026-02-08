"use server";

import prima from "@/lib/prisma";

import { currentUser } from "@clerk/nextjs/server";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";
import { reviewSchema, validateWithZodSchema } from "./schemas";

const getAuthUser = async () => {
	const user = await currentUser();

	if (!user) {
		toast.error("You must be logged in to perform this action");
		throw new Error("Unauthorized");
	}
	return user;
};

const renderError = (error: unknown): { message: string } => {
	return {
		message: error instanceof Error ? error.message : "an error occurred",
	};
};

export const fetchFeaturedProducts = async () => {
	const products = await prima.product.findMany({
		where: {
			featured: true,
			isNew: false,
		},
		take: 10,
	});

	return products;
};

export const fetchNewProducts = async () => {
	const products = await prima.product.findMany({
		orderBy: { createdAt: "desc" },
		where: { isNew: true },
		take: 10,
	});
	return products;
};

export const fetchAllProducts = async () => {
	const products = await prima.product.findMany();
	return products;
};

export const fetchProductById = async (id: string) => {
	const product = await prima.product.findUnique({
		where: { id },
	});
	return product;
};

export const fetchProductBySlug = async (slug: string) => {
	const product = await prima.product.findUnique({
		where: { slug },
	});
	return product;
};

export const fetchProductsByCategory = async (slug: string) => {
	const category = await prima.category.findUnique({
		where: { slug },
		select: { id: true },
	});

	if (!category) {
		return [];
	}

	const products = await prima.product.findMany({
		where: { categoryId: category.id },
	});

	return products;
};

export const fetchAllCategories = async () => {
	const categories = await prima.category.findMany();
	return categories;
};

export const fetchCategoryById = async (id: string) => {
	const category = await prima.category.findUnique({
		where: { id },
	});
	return category;
};

export const fetchCategoryBySlug = async (slug: string) => {
	const category = await prima.category.findUnique({
		where: { slug },
	});
	return category;
};

export const searchProducts = async (query: string) => {
	if (!query || query.trim().length === 0) {
		return [];
	}

	const products = await prima.product.findMany({
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
	const favorite = await prima.favourite.findFirst({
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
			await prima.favourite.delete({
				where: {
					id: favoriteId,
				},
			});
		} else {
			await prima.favourite.create({
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
	const favorites = await prima.favourite.findMany({
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
		await prima.review.create({
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
	const reviews = await prima.review.findMany({
		where: { productId },
		orderBy: { createdAt: "desc" },
	});
	return reviews;
};
export const fetchProductRating = async (productId: string) => {
	const reviews = await prima.review.groupBy({
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
	const reviews = await prima.review.findMany({
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
		const result = await prima.review.deleteMany({
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
	return prima.review.findFirst({
		where: {
			clerkId: userId,
			productId,
		},
	});
};
