import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
	apiVersion: "2026-01-28.clover",
});
import { type NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
	const requestHeaders = new Headers(req.headers);
	const origin = requestHeaders.get("origin");

	const { orderId, cartId } = await req.json();

	const order = await prisma.order.findUnique({
		where: {
			id: orderId,
		},
	});

	const cart = await prisma.cart.findUnique({
		where: {
			id: cartId,
		},
		include: {
			cartItems: {
				include: {
					product: true,
				},
			},
		},
	});

	if (!order || !cart) {
		return new Response(null, {
			status: 404,
			statusText: "Not Found",
		});
	}
	// line items
	const line_items = cart.cartItems.map((cartItem) => {
		// Validate image URL - Stripe requires absolute URLs starting with https://
		const isValidImageUrl =
			cartItem.product.image &&
			(cartItem.product.image.startsWith("https://") ||
				cartItem.product.image.startsWith("http://"));

		return {
			quantity: cartItem.amount,
			price_data: {
				currency: "usd",
				product_data: {
					name: cartItem.product.name,
					...(isValidImageUrl && {
						images: [cartItem.product.image],
					}),
				},
				unit_amount: cartItem.product.price * 100, // price in cents
			},
		};
	});

	try {
		const session = await stripe.checkout.sessions.create({
			ui_mode: "embedded",
			metadata: { orderId, cartId },
			line_items: line_items,
			mode: "payment",
			return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}&orderId=${orderId}&cartId=${cartId}`,
		});

		return new Response(
			JSON.stringify({ clientSecret: session.client_secret }),
		);
	} catch (error) {
		console.log(error);
		return new Response(null, {
			status: 500,
			statusText: "Internal Server Error",
		});
	}
};
