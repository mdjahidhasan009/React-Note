import { ReactNode } from 'react';

type ABTestingProps = {
	experiments: { [key: string]: number };
	children: (variant: string) => ReactNode;
};

export const ABTesting = ({ experiments, children }: ABTestingProps) => {
	const variants = Object.keys(experiments);

	const random = Math.floor(Math.random() * variants.length);
	const assignedVariant = variants[random];

	return children(assignedVariant);
};
