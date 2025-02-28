import { FC, ReactNode } from 'react';

type ABTestProps = {
	experiments: { [key: string]: number };
	children: (variant: string) => ReactNode;
};

export const ABTest: FC<ABTestProps> = ({ experiments, children }) => {
	const variants = Object.keys(experiments);

	const random = Math.floor(Math.random() * variants.length);
	const assignedVariant = variants[random];

	return children(assignedVariant);
};
