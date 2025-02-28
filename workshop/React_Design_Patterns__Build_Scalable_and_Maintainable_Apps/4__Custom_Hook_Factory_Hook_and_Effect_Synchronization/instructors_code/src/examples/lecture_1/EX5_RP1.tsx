import { useEffect, useState } from 'react';

type Props = {
	render: (x: number, y: number) => React.ReactNode;
};

export const MouseTracker = ({ render }: Props) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setPosition({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener('mousemove', handleMouseMove);

		return () => window.removeEventListener('mousemove', handleMouseMove);
	}, []);

	return render(position.x, position.y);
};
