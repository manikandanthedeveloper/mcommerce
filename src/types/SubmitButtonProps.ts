type btnSize =
	| "lg"
	| "default"
	| "xs"
	| "sm"
	| "icon"
	| "icon-xs"
	| "icon-sm"
	| "icon-lg";

export type SubmitButtonProps = {
	className?: string;
	text?: string;
	size?: btnSize;
};
