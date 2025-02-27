import { createContext, PropsWithChildren, useContext, useState } from 'react';

type AccordionContext = {
	isOpen: boolean;
	toggle: () => void;
};

const AccordionContext = createContext<AccordionContext | null>(null);

export const Accordion = ({ children }: PropsWithChildren) => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen((prev) => !prev);

	return (
		<AccordionContext value={{ isOpen, toggle }}>{children}</AccordionContext>
	);
};

const useAccordion = () => {
	const context = useContext(AccordionContext);

	if (!context) {
		throw new Error('useAccordion must be used within an Accordion');
	}

	return context;
};

const AccordionHeader = ({
	children,
	className = '',
}: PropsWithChildren<{ className?: string }>) => {
	const { isOpen, toggle } = useAccordion();

	return (
		<button
			className={`w-full p-4 text-left bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex justify-between items-center rounded-t-lg ${className}`}
			aria-expanded={isOpen}
			role='button'
			onClick={toggle}
		>
			<div className='font-medium'>{children}</div>
			<svg
				className={`w-4 h-4 transform transition-transform duration-200 ${
					isOpen ? 'rotate-180' : ''
				}`}
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M19 9l-7 7-7-7'
				/>
			</svg>
		</button>
	);
};

const AccordionContent = ({
	children,
	className = '',
}: PropsWithChildren<{ className?: string }>) => {
	const { isOpen } = useAccordion();

	return isOpen ? (
		<div
			className={`p-4 border border-gray-200 rounded-b-lg bg-white ${className}`}
			aria-hidden={!isOpen}
		>
			{children}
		</div>
	) : null;
};

Accordion.Header = AccordionHeader;
Accordion.Content = AccordionContent;

export default Accordion;
