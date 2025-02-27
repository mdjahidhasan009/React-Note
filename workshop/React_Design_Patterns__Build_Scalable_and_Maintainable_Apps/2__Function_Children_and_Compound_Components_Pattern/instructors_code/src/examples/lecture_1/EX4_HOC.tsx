import { ComponentType, useEffect, useState } from 'react';

export const withDataFetch = (Component: ComponentType, url: string) => {
	return (props: any) => {
		const [data, setData] = useState<unknown>(null);
		const [loading, setLoading] = useState(true);
		const [error, setError] = useState<string | null>(null);

		useEffect(() => {
			const controller = new AbortController();
			const signal = controller.signal;

			const fetchData = async () => {
				try {
					const response = await fetch(url, { signal });
					if (!response.ok) {
						throw new Error('Failed to fetch data');
					}
					const result = await response.json();
					setData(result);
				} catch (err) {
					if (err instanceof Error && err.name === 'AbortError') {
						return;
					}
					setError(
						err instanceof Error ? err.message : 'An unknown error occurred'
					);
				} finally {
					setLoading(false);
				}
			};

			fetchData();

			return () => {
				controller.abort();
			};
		}, [url]);

		if (loading) return <p>Loading...</p>;
		if (error) return <p>Error: {error}</p>;

		return <Component data={data} {...props} />;
	};
};
