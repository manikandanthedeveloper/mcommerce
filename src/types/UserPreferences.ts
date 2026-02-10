export type UserPreferences = {
	id: string;
	clerkId: string;
	emailNotificationsOrders: boolean;
	emailNotificationsNewsletter: boolean;
	emailNotificationsPromotions: boolean;
	privacyShowProfile: boolean;
	privacyAllowMessages: boolean;
	privacyDataCollection: boolean;
	createdAt: string;
	updatedAt: string;
};

export type UserPreferencesFormData = Omit<
	UserPreferences,
	"id" | "clerkId" | "createdAt" | "updatedAt"
>;
