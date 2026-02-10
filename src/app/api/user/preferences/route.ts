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

		let preferences = await prisma.userPreferences.findUnique({
			where: { clerkId: userId },
		});

		// If no preferences exist, create default ones
		if (!preferences) {
			preferences = await prisma.userPreferences.create({
				data: {
					clerkId: userId,
					emailNotificationsOrders: true,
					emailNotificationsNewsletter: true,
					emailNotificationsPromotions: true,
					privacyShowProfile: true,
					privacyAllowMessages: true,
					privacyDataCollection: false,
				},
			});
		}

		return NextResponse.json(preferences);
	} catch (error) {
		console.error("Error fetching preferences:", error);
		return NextResponse.json(
			{ error: "Failed to fetch preferences" },
			{ status: 500 },
		);
	}
}

export async function PUT(req: NextRequest) {
	try {
		const { userId } = await auth();

		if (!userId) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const {
			emailNotificationsOrders,
			emailNotificationsNewsletter,
			emailNotificationsPromotions,
			privacyShowProfile,
			privacyAllowMessages,
			privacyDataCollection,
		} = await req.json();

		const preferences = await prisma.userPreferences.upsert({
			where: { clerkId: userId },
			create: {
				clerkId: userId,
				emailNotificationsOrders,
				emailNotificationsNewsletter,
				emailNotificationsPromotions,
				privacyShowProfile,
				privacyAllowMessages,
				privacyDataCollection,
			},
			update: {
				emailNotificationsOrders,
				emailNotificationsNewsletter,
				emailNotificationsPromotions,
				privacyShowProfile,
				privacyAllowMessages,
				privacyDataCollection,
			},
		});

		return NextResponse.json(preferences);
	} catch (error) {
		console.error("Error updating preferences:", error);
		return NextResponse.json(
			{ error: "Failed to update preferences" },
			{ status: 500 },
		);
	}
}
