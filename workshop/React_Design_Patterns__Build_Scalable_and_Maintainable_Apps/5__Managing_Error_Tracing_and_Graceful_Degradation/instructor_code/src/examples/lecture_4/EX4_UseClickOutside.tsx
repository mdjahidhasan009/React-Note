import { useEffect, useRef, useState } from 'react';

export const useClickOutside = <T extends HTMLElement>(cb: () => void) => {
	const ref = useRef<T | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				cb();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [cb]);

	return ref;
};

export const Dropdown = () => {
	const [open, setOpen] = useState(false);
	const dropdownRef = useClickOutside<HTMLDivElement>(() => setOpen(false));

	return (
		<div ref={dropdownRef} className='relative w-64'>
			<button
				onClick={() => setOpen((prev) => !prev)}
				className='w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
			>
				<div className='flex items-center justify-between'>
					<span>Select an option</span>
					<svg
						className={`w-5 h-5 transition-transform duration-200 ${
							open ? 'transform rotate-180' : ''
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
				</div>
			</button>
			{open && (
				<div className='absolute w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10'>
					<ul className='py-1'>
						<li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
							Option 1
						</li>
						<li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
							Option 2
						</li>
						<li className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
							Option 3
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};
