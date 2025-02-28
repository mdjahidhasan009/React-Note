import { JSX, useEffect, useRef } from 'react';

export const DisableContextMenu = ({
	render,
	className = '',
}: {
	render: () => JSX.Element;
	className?: string;
}) => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleContextMenu = (event: MouseEvent) => {
			event.preventDefault(); // Disable right-click context menu
		};

		// Only attach event listener to the referenced div element
		const element = ref.current;
		if (element) {
			element.addEventListener('contextmenu', handleContextMenu);

			// Cleanup the event listener on unmount
			return () => {
				element.removeEventListener('contextmenu', handleContextMenu);
			};
		}
	}, []);

	return (
		<div ref={ref} className={className}>
			{render()}
		</div>
	);
};
