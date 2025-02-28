import { useState } from 'react';

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

const useCounter = (initialState = 0) => {
	const [count, setCount] = useState(initialState);

	const increment = () => setCount((prev) => prev + 1);
	const decrement = () => setCount((prev) => prev - 1);
	const reset = () => setCount(initialState);

	return { count, increment, decrement, reset };
};

const Counter = () => {
	const { count, increment, decrement, reset } = useCounter();
	const {
		count: count2,
		increment: increment2,
		decrement: decrement2,
		reset: reset2,
	} = useCounter(10);

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
			<p className='text-2xl font-bold'>Count: {count2}</p>
			<div className='flex gap-2'>
				<button
					className='bg-blue-500 text-white px-4 py-2 rounded'
					onClick={increment2}
				>
					Increment
				</button>
				<button
					className='bg-red-500 text-white px-4 py-2 rounded'
					onClick={decrement2}
				>
					Decrement
				</button>
				<button
					className='bg-gray-500 text-white px-4 py-2 rounded'
					onClick={reset2}
				>
					Reset
				</button>
			</div>
		</div>
	);
};
