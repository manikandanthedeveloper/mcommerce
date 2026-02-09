import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { fetchOrCreateCart } from "@/util/actions";

export async function GET() {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const cart = await fetchOrCreateCart({ userId });
		const cartItems = await prisma.cartItem.findMany({
			where: { cartId: cart.id },
			include: {
				product: true,
			},
		});

		const items = cartItems.map((item) => ({
			id: item.id,
			productId: item.productId,
			title: item.product.name,
			image: item.product.image,
			price: String(item.product.price),
			slug: item.product.slug,
			amount: item.amount,
		}));

		return NextResponse.json({ items });
	} catch (error) {
		console.error("Cart fetch error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch cart" },
			{ status: 500 },
		);
	}
}
