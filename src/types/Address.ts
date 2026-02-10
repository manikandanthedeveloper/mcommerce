export type Address = {
	id: string;
	clerkId: string;
	fullName: string;
	phone: string;
	email: string;
	street: string;
	city: string;
	state: string;
	zipCode: string;
	country: string;
	isDefault: boolean;
	createdAt: string;
	updatedAt: string;
};

export type AddressFormData = Omit<
	Address,
	"id" | "clerkId" | "createdAt" | "updatedAt"
>;
