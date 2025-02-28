import { useState } from 'react';

// Bad Code
export const BadCounter = () => {
	const [count, setCount] = useState(0);

	const increment = () => setCount((prev) => prev + 1);
	const decrement = () => setCount((prev) => prev - 1);
	const reset = () => setCount(0);

	return (
		<div>
			<p className='text-2xl font-bold'>Count: {count}</p>
			<div className='flex gap-2'>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded'
					onClick={increment}
				>
					Increment
				</button>
				<button
					className='bg-red-500 text-white px-4 py-2 rounded'
					onClick={decrement}
				>
					Decrement
				</button>
				<button
					className='bg-gray-500 text-white px-4 py-2 rounded'
					onClick={reset}
				>
					Reset
				</button>
			</div>
		</div>
	);
};
