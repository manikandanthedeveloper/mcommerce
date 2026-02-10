import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const methods = await prisma.paymentMethod.findMany({
			where: { clerkId: userId },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(methods);
	} catch (error) {
		console.error("Error fetching payment methods:", error);
		return NextResponse.json(
			{ error: "Failed to fetch payment methods" },
			{ status: 500 },
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { brand, last4, expMonth, expYear, holderName, isDefault } =
			await req.json();

		if (isDefault) {
			await prisma.paymentMethod.updateMany({
				where: { clerkId: userId },
				data: { isDefault: false },
			});
		}

		const method = await prisma.paymentMethod.create({
			data: {
				clerkId: userId,
				brand,
				last4,
				expMonth,
				expYear,
				holderName,
				isDefault,
			},
		});

		return NextResponse.json(method, { status: 201 });
	} catch (error) {
		console.error("Error creating payment method:", error);
		return NextResponse.json(
			{ error: "Failed to create payment method" },
			{ status: 500 },
		);
	}
}
