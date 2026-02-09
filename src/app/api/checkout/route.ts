import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: "2026-01-28.clover",
});

export async function POST(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	const origin = requestHeaders.get("origin");

	try {
		const { orderId, cartId } = await request.json();

		if (!orderId || !cartId) {
			return NextResponse.json(
				{ error: "orderId and cartId are required" },
				{ status: 400 },
			);
		}

		// Fetch the order
		const order = await prisma.order.findUnique({
			where: { id: orderId },
		});

		if (!order) {
			return NextResponse.json(
				{ error: "Order not found" },
				{ status: 404 },
			);
		}

		// Fetch the cart with cart items and products
		const cart = await prisma.cart.findUnique({
			where: { id: cartId },
			include: {
				cartItems: {
					include: {
						product: true,
					},
				},
			},
		});

		if (!cart || !cart.cartItems.length) {
			return NextResponse.json(
				{ error: "Cart not found or is empty" },
				{ status: 404 },
			);
		}

		// Create line items for Stripe
		const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
			cart.cartItems.map((item) => {
				// Validate image URL - Stripe requires absolute URLs starting with https://
				const isValidImageUrl =
					item.product.image &&
					(item.product.image.startsWith("https://") ||
						item.product.image.startsWith("http://"));

				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: item.product.name,
							...(isValidImageUrl && {
								images: [item.product.image],
							}),
						},
						unit_amount: Math.round(
							Number(item.product.price) * 100,
						), // Convert to cents
					},
					quantity: item.amount,
				};
			});

		// Create Stripe checkout session
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			line_items,
			mode: "payment",
			return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}&cartId=${cartId}`,
			metadata: {
				orderId,
				cartId,
			},
		});

		return NextResponse.json({ clientSecret: session.client_secret });
	} catch (error) {
		console.error("Checkout error:", error);
		return NextResponse.json(
			{
				error:
					error instanceof Error
						? error.message
						: "Internal server error",
			},
			{ status: 500 },
		);
	}
}
