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

		const userProfile = await prisma.user.findUnique({
			where: { clerkId: userId },
		});

		return NextResponse.json(userProfile || {});
	} catch (error) {
		console.error("Error fetching user profile:", error);
		return NextResponse.json(
			{ error: "Failed to fetch profile" },
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

		const { firstName, lastName, phoneNumber } = await req.json();

		const userProfile = await prisma.user.upsert({
			where: { clerkId: userId },
			update: {
				firstName,
				lastName,
				phoneNumber,
			},
			create: {
				clerkId: userId,
				firstName,
				lastName,
				phoneNumber,
			},
		});

		return NextResponse.json(userProfile);
	} catch (error) {
		console.error("Error updating user profile:", error);
		return NextResponse.json(
			{ error: "Failed to update profile" },
			{ status: 500 },
		);
	}
}
