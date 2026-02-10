import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ paymentMethodId: string }> },
) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { paymentMethodId } = await params;
		const { brand, last4, expMonth, expYear, holderName, isDefault } =
			await req.json();

		const existing = await prisma.paymentMethod.findUnique({
			where: { id: paymentMethodId },
		});

		if (!existing || existing.clerkId !== userId) {
			return NextResponse.json(
				{ error: "Payment method not found or unauthorized" },
				{ status: 404 },
			);
		}

		if (isDefault) {
			await prisma.paymentMethod.updateMany({
				where: { clerkId: userId, id: { not: paymentMethodId } },
				data: { isDefault: false },
			});
		}

		const method = await prisma.paymentMethod.update({
			where: { id: paymentMethodId },
			data: {
				brand,
				last4,
				expMonth,
				expYear,
				holderName,
				isDefault,
			},
		});

		return NextResponse.json(method);
	} catch (error) {
		console.error("Error updating payment method:", error);
		return NextResponse.json(
			{ error: "Failed to update payment method" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ paymentMethodId: string }> },
) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { paymentMethodId } = await params;
		const existing = await prisma.paymentMethod.findUnique({
			where: { id: paymentMethodId },
		});

		if (!existing || existing.clerkId !== userId) {
			return NextResponse.json(
				{ error: "Payment method not found or unauthorized" },
				{ status: 404 },
			);
		}

		await prisma.paymentMethod.delete({
			where: { id: paymentMethodId },
		});

		return NextResponse.json({
			message: "Payment method deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting payment method:", error);
		return NextResponse.json(
			{ error: "Failed to delete payment method" },
			{ status: 500 },
		);
	}
}
