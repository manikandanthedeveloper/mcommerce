export type PaymentMethod = {
	id: string;
	clerkId: string;
	brand: string;
	last4: string;
	expMonth: number;
	expYear: number;
	holderName: string;
	isDefault: boolean;
	createdAt: string;
	updatedAt: string;
};

export type PaymentMethodFormData = Omit<
	PaymentMethod,
	"id" | "clerkId" | "createdAt" | "updatedAt"
>;
