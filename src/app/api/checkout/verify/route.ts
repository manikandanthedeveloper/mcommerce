import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: "2026-01-28.clover",
});

export async function POST(request: NextRequest) {
	try {
		const { sessionId, orderId, cartId } = await request.json();

		if (!sessionId || !orderId || !cartId) {
			return NextResponse.json(
				{ error: "Missing required parameters" },
				{ status: 400 },
			);
		}

		// Retrieve the session from Stripe
		const session = await stripe.checkout.sessions.retrieve(sessionId);

		if (session.payment_status !== "paid") {
			return NextResponse.json(
				{ success: false, error: "Payment not completed" },
				{ status: 400 },
			);
		}

		// Update the order to mark it as paid
		await prisma.order.update({
			where: { id: orderId },
			data: {
				isPaid: true,
			},
		});

		// Clear the cart items
		await prisma.cartItem.deleteMany({
			where: {
				cartId: cartId,
			},
		});

		// Update cart totals to zero
		await prisma.cart.update({
			where: { id: cartId },
			data: {
				numItemsInCart: 0,
				cartTotal: 0,
				tax: 0,
				orderTotal: 0,
			},
		});

		return NextResponse.json({
			success: true,
			message: "Payment verified and order updated",
		});
	} catch (error) {
		console.error("Verification error:", error);
		return NextResponse.json(
			{
				success: false,
				error:
					error instanceof Error
						? error.message
						: "Failed to verify payment",
			},
			{ status: 500 },
		);
	}
}
