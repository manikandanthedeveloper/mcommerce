import {
	User,
	Heart,
	ShoppingBag,
	Star,
	CreditCard,
	Settings,
} from "lucide-react";

export const myAccountLinks = [
	{
		label: "Profile",
		href: "/myaccount",
		icon: User,
		description: "Manage your profile information",
	},
	{
		label: "Favourites",
		href: "/myaccount/favourites",
		icon: Heart,
		description: "View your saved items",
	},
	{
		label: "Orders",
		href: "/myaccount/orders",
		icon: ShoppingBag,
		description: "View your order history",
	},
	{
		label: "Reviews",
		href: "/myaccount/reviews",
		icon: Star,
		description: "Manage your reviews",
	},
	{
		label: "Payment Methods",
		href: "/myaccount/payment",
		icon: CreditCard,
		description: "Manage your payment methods",
	},
	{
		label: "Settings",
		href: "/myaccount/settings",
		icon: Settings,
		description: "Account settings & preferences",
	},
];
