"use server";

import prisma from "@/lib/prisma";

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
