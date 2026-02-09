import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { fetchOrCreateCart, updateCart } from "@/util/actions";

type SyncItem = {
	productId: string;
	amount: number;
};

export async function POST(request: NextRequest) {
	const { userId } = await auth();
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const body = (await request.json()) as { items?: SyncItem[] };
		const items = Array.isArray(body.items) ? body.items : [];

		const normalized = items.filter(
			(item) =>
				item &&
				typeof item.productId === "string" &&
				item.productId.length > 0 &&
				typeof item.amount === "number" &&
				item.amount > 0,
		);

		const cart = await fetchOrCreateCart({ userId });
		const existing = await prisma.cartItem.findMany({
			where: { cartId: cart.id },
		});
		const existingByProduct = new Map(
			existing.map((item) => [item.productId, item]),
		);

		for (const item of normalized) {
			const current = existingByProduct.get(item.productId);
			if (current) {
				if (current.amount !== item.amount) {
					await prisma.cartItem.update({
						where: { id: current.id },
						data: { amount: item.amount },
					});
				}
			} else {
				await prisma.cartItem.create({
					data: {
						cartId: cart.id,
						productId: item.productId,
						amount: item.amount,
					},
				});
			}
		}

		const productIds = normalized.map((item) => item.productId);
		await prisma.cartItem.deleteMany({
			where: {
				cartId: cart.id,
				productId: productIds.length
					? { notIn: productIds }
					: undefined,
			},
		});

		await updateCart(cart);
		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Cart sync error:", error);
		return NextResponse.json(
			{ error: "Failed to sync cart" },
			{ status: 500 },
		);
	}
}
