export type Product = {
	id?: string;
	name: string;
	slug: string;
	description: string;
	featured: boolean;
	image: string;
	price: number;
	specialPricePercent?: number;
	isNew: boolean;
	clerkId: string;
	categoryId?: string;
};
