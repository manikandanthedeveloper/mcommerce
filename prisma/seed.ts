import { PrismaClient } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import products from "./products.json";
import categories from "./categories.json";
import "dotenv/config";
type SeedProduct = {
	name: string;
	description: string;
	featured: boolean;
	image: string;
	price: number;
	specialPricePercent?: number;
	isNew: boolean;
	clerkId: string;
	categoryName: string;
};

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
				slug: category.name.toLowerCase().replace(/\s+/g, "-"),
				description: category.description || "",
			},
		});
		categoryMap[category.name] = created.id;
	}

	// Seed products with category associations
	for (const product of products as SeedProduct[]) {
		const categoryId = categoryMap[product.categoryName];
		if (!categoryId) {
			console.warn(`Category not found for product: ${product.name}`);
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
				slug: product.name.toLowerCase().replace(/\s+/g, "-"),
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
