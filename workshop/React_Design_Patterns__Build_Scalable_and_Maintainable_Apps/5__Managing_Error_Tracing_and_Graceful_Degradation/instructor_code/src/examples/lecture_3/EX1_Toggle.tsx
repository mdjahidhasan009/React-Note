import { useState } from 'react';

type ToggleProps = {
	enabled?: boolean;
	onChange?: (enabled: boolean) => void;
	children?: React.ReactNode;
};

export const Toggle = ({ enabled, onChange, children }: ToggleProps) => {
	const [internalState, setInternalState] = useState(false);

	const isControlled = enabled !== undefined;

	const currentState = isControlled ? enabled : internalState;

	const handleToggle = () => {
		if (isControlled) {
			onChange?.(!currentState);
		} else {
			setInternalState(!currentState);
		}
	};

	const label = children ? children : currentState ? 'On' : 'Off';

	return (
		<button
			onClick={handleToggle}
			className={`
        px-4 py-2 rounded-md transition-colors duration-200
        ${
					currentState ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
				}
      `}
		>
			{label}
		</button>
	);
};
