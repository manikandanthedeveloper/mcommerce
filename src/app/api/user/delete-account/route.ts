import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json().catch(() => ({}));
		if (body?.confirmation !== "DELETE") {
			return NextResponse.json(
				{ error: "Confirmation required" },
				{ status: 400 },
			);
		}

		await prisma.$transaction([
			prisma.favourite.deleteMany({ where: { clerkId: userId } }),
			prisma.review.deleteMany({ where: { clerkId: userId } }),
			prisma.paymentMethod.deleteMany({ where: { clerkId: userId } }),
			prisma.address.deleteMany({ where: { clerkId: userId } }),
			prisma.userPreferences.deleteMany({ where: { clerkId: userId } }),
			prisma.order.deleteMany({ where: { clerkId: userId } }),
			prisma.cart.deleteMany({ where: { clerkId: userId } }),
			prisma.user.deleteMany({ where: { clerkId: userId } }),
		]);

		await (await clerkClient()).users.deleteUser(userId);

		return NextResponse.json({ message: "Account deleted" });
	} catch (error) {
		console.error("Error deleting account:", error);
		return NextResponse.json(
			{ error: "Failed to delete account" },
			{ status: 500 },
		);
	}
}
