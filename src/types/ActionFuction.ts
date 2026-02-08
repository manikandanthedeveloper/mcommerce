export type ActionFunction = (
	prevState: unknown,
	formData: FormData,
) => Promise<{ message: string } | void>;
