import { ReactNode, useEffect, useState, useCallback } from 'react';

type PollingState<T> = {
	data: T | null;
	error: Error | null;
	lastFetched: Date | null;
};

type PollingProps<T> = {
	interval?: number;
	initialData?: T | null;
	fetcher: () => Promise<T>;
	children: (props: {
		data: T | null;
		isError: boolean;
		error: Error | null;
		lastFetched: Date | null;
		refresh: () => Promise<void>;
		pause: () => void;
		resume: () => void;
	}) => ReactNode;
};

export const Polling = <T,>({
	interval = 5000,
	fetcher,
	children,
	initialData = null,
}: PollingProps<T>) => {
	const [state, setState] = useState<PollingState<T>>({
		data: initialData,
		error: null,
		lastFetched: null,
	});
	const [isPaused, setIsPaused] = useState(false);

	const fetchData = useCallback(async () => {
		try {
			const data = await fetcher();
			setState({
				data,
				error: null,
				lastFetched: new Date(),
			});
		} catch (error) {
			setState((prev) => ({
				...prev,
				error: error as Error,
			}));
		}
	}, [fetcher]);

	useEffect(() => {
		if (isPaused) return;

		fetchData();
		const intervalId = setInterval(() => {
			fetchData();
		}, interval);

		return () => clearInterval(intervalId);
	}, [interval, fetchData, isPaused]);

	const refresh = useCallback(async () => {
		await fetchData();
	}, [fetchData]);

	const pause = useCallback(() => {
		setIsPaused(true);
	}, []);

	const resume = useCallback(() => {
		setIsPaused(false);
	}, []);

	return children({
		...state,
		isError: state.error !== null,
		refresh,
		pause,
		resume,
	});
};

const PollingExample = () => {
	const mockFetcher = async () => {
		// Fetch a random post from JSONPlaceholder
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/posts/' +
				Math.floor(Math.random() * 100 + 1)
		);
		const data = await response.json();
		return data.title;
	};

	return (
		<div className='p-4 border rounded'>
			<h2 className='text-xl font-bold mb-4'>Polling Example</h2>

			<Polling interval={10000} fetcher={mockFetcher}>
				{({ data, lastFetched, isError, error, refresh, pause, resume }) => (
					<div className='space-y-4'>
						<div>
							<p>Post Title: {data}</p>
							<p className='text-sm text-gray-600'>
								Last Updated: {lastFetched?.toLocaleTimeString()}
							</p>
						</div>

						{isError && (
							<div className='text-red-500'>Error: {error?.message}</div>
						)}

						<div className='space-x-2'>
							<button
								onClick={refresh}
								className='px-4 py-2 bg-blue-500 text-white rounded'
							>
								Refresh Now
							</button>
							<button
								onClick={pause}
								className='px-4 py-2 bg-yellow-500 text-white rounded'
							>
								Pause
							</button>
							<button
								onClick={resume}
								className='px-4 py-2 bg-green-500 text-white rounded'
							>
								Resume
							</button>
						</div>
					</div>
				)}
			</Polling>
		</div>
	);
};

export default PollingExample;
