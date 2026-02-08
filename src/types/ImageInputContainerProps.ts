import { ActionFunction } from "./ActionFuction";

export type ImageInputContainerProps = {
	image: string;
	name: string;
	action: ActionFunction;
	text: string;
	children?: React.ReactNode;
};
