import { ReactNode, useState } from 'react';

type ToggleProps = {
	enabled?: boolean;
	defaultEnabled?: boolean;
	onChange?: (enabled: boolean) => void;
	children?: ReactNode;
};

export const Toggle = ({
	defaultEnabled = false,
	enabled,
	onChange,
	children,
}: ToggleProps) => {
	const [internalEnabled, setInternalEnabled] = useState(defaultEnabled);

	const isControlled = enabled !== undefined;
	const currentState = isControlled ? enabled : internalEnabled;

	const handleToggle = () => {
		if (isControlled) {
			onChange?.(!currentState);
		} else {
			setInternalEnabled(!internalEnabled);
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
