const specialPrice = ({
	price,
	specialPricePercent,
}: {
	price: number;
	specialPricePercent?: number;
}) => {
	if (specialPricePercent) {
		return price * (1 - specialPricePercent / 100);
	}
	return price;
};
export { specialPrice };
