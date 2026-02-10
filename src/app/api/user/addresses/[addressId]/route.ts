import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ addressId: string }> },
) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { addressId } = await params;
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

		// Check if this address belongs to the user
		const existingAddress = await prisma.address.findUnique({
			where: { id: addressId },
		});

		if (!existingAddress || existingAddress.clerkId !== userId) {
			return NextResponse.json(
				{ error: "Address not found or unauthorized" },
				{ status: 404 },
			);
		}

		// If this is the default address, unset other default addresses
		if (isDefault) {
			await prisma.address.updateMany({
				where: { clerkId: userId, id: { not: addressId } },
				data: { isDefault: false },
			});
		}

		const address = await prisma.address.update({
			where: { id: addressId },
			data: {
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

		return NextResponse.json(address);
	} catch (error) {
		console.error("Error updating address:", error);
		return NextResponse.json(
			{ error: "Failed to update address" },
			{ status: 500 },
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ addressId: string }> },
) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const { addressId } = await params;

		// Check if this address belongs to the user
		const existingAddress = await prisma.address.findUnique({
			where: { id: addressId },
		});

		if (!existingAddress || existingAddress.clerkId !== userId) {
			return NextResponse.json(
				{ error: "Address not found or unauthorized" },
				{ status: 404 },
			);
		}

		await prisma.address.delete({
			where: { id: addressId },
		});

		return NextResponse.json({ message: "Address deleted successfully" });
	} catch (error) {
		console.error("Error deleting address:", error);
		return NextResponse.json(
			{ error: "Failed to delete address" },
			{ status: 500 },
		);
	}
}
