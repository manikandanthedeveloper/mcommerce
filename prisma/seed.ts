import { PrismaClient } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import productsData from "./products";
import categoriesData from "./categories";
import "dotenv/config";
import { Product } from "@/types/Product";
import CategoryList from "@/types/CategoryList";

const products: Product[] = productsData;
const categories: CategoryList[] = categoriesData;

const adapter = new PrismaPg({
	connectionString: process.env["DATABASE_URL"]!,
});

const prisma = new PrismaClient({
	adapter,
});

export async function main() {
	// Clear existing data
	await prisma.product.deleteMany({});
	await prisma.category.deleteMany({});

	// Seed categories
	const categoryMap: { [key: string]: string } = {};
	for (const category of categories) {
		const created = await prisma.category.create({
			data: {
				name: category.name,
				slug: category.slug,
				description: category.description || "",
			},
		});
		
		if (category.id) {
			categoryMap[category.id] = created.id; // Map original category ID to new database ID
		}
	}

	// Seed products with category associations
	for (const product of products) {
		if (!product.categoryId) {
			console.warn(
				`Category ID is missing for product "${product.name}"`,
			);
			continue;
		}
		const categoryId = categoryMap[product.categoryId];
		if (!categoryId) {
			console.warn(
				`Category "${product.categoryId}" not found for product "${product.name}"`,
			);
			continue;
		}
		await prisma.product.create({
			data: {
				name: product.name,
				description: product.description,
				featured: product.featured,
				image: product.image,
				price: product.price,
				specialPricePercent: product.specialPricePercent ?? 0,
				isNew: product.isNew,
				clerkId: product.clerkId,
				slug: product.slug,
				categoryId: categoryId,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
		console.log("Seeding completed successfully.");
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
