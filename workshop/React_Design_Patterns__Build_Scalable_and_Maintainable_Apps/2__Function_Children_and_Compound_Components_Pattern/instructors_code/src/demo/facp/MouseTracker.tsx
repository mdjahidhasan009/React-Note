import { ReactNode, useState } from 'react';

type MouseTrackerProps = {
	className?: string;
	children: (x: number, y: number) => ReactNode;
};

export const MouseTracker = ({
	className = 'w-full h-full',
	children,
}: MouseTrackerProps) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	return (
		<div
			className={className}
			onMouseMove={(e) => setPosition({ x: e.clientX, y: e.clientY })}
		>
			{children(position.x, position.y)}
		</div>
	);
};
