import { auth } from "@clerk/nextjs/server";
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

		const formData = await req.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return NextResponse.json(
				{ error: "No file provided" },
				{ status: 400 },
			);
		}

		// Convert file to base64
		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);
		const base64 = buffer.toString("base64");
		const dataUrl = `data:${file.type};base64,${base64}`;

		// Update user profile with photo
		const userProfile = await prisma.user.upsert({
			where: { clerkId: userId },
			update: {
				photoUrl: dataUrl,
			},
			create: {
				clerkId: userId,
				photoUrl: dataUrl,
			},
		});

		return NextResponse.json(userProfile);
	} catch (error) {
		console.error("Error uploading photo:", error);
		return NextResponse.json(
			{ error: "Failed to upload photo", details: String(error) },
			{ status: 500 },
		);
	}
}
