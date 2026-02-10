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

		const addresses = await prisma.address.findMany({
			where: { clerkId: userId },
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json(addresses);
	} catch (error) {
		console.error("Error fetching addresses:", error);
		return NextResponse.json(
			{ error: "Failed to fetch addresses" },
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

		const {
			fullName,
			phone,
			email,
			street,
			city,
			state,
			zipCode,
			country,
			isDefault,
		} = await req.json();

		// If this is the default address, unset other default addresses
		if (isDefault) {
			await prisma.address.updateMany({
				where: { clerkId: userId },
				data: { isDefault: false },
			});
		}

		const address = await prisma.address.create({
			data: {
				clerkId: userId,
				fullName,
				phone,
				email,
				street,
				city,
				state,
				zipCode,
				country,
				isDefault,
			},
		});

		return NextResponse.json(address, { status: 201 });
	} catch (error) {
		console.error("Error creating address:", error);
		return NextResponse.json(
			{ error: "Failed to create address" },
			{ status: 500 },
		);
	}
}
