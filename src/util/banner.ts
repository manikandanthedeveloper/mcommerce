import BannerImage1 from "@/banners/banner1.jpg";
import BannerImage2 from "@/banners/banner2.jpg";
import BannerImage3 from "@/banners/banner3.jpg";

const slides = [
	{
		id: "new-arrivals",
		kicker: "New arrivals",
		title: "Fresh styles for everyday comfort",
		description:
			"Explore the latest picks for work, weekend, and everything in between.",
		ctaText: "Shop now",
		ctaHref: "/products",
		secondaryText: "View categories",
		secondaryHref: "/products",
		imgSrc: BannerImage1.src,
		bgClass:
			"bg-gradient-to-r from-indigo-500/20 via-sky-500/15 to-emerald-500/20",
	},
	{
		id: "best-sellers",
		kicker: "Best sellers",
		title: "Fan favorites you'll love",
		description:
			"Shop our top-rated essentials curated from thousands of happy customers.",
		ctaText: "Shop best sellers",
		ctaHref: "/products",
		secondaryText: "Read reviews",
		secondaryHref: "/reviews",
		imgSrc: BannerImage2.src,
		bgClass:
			"bg-gradient-to-r from-rose-500/20 via-orange-500/15 to-amber-500/20",
	},
	{
		id: "member-deals",
		kicker: "Member deals",
		title: "Extra savings on must-have items",
		description:
			"Join today to unlock exclusive offers and early access to drops.",
		ctaText: "Join now",
		ctaHref: "/about",
		secondaryText: "Learn more",
		secondaryHref: "/about",
		imgSrc: BannerImage3.src,
		bgClass:
			"bg-gradient-to-r from-violet-500/20 via-fuchsia-500/15 to-pink-500/20",
	},
];

export default slides;
