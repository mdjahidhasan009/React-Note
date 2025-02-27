import { ComponentType, useEffect, useState } from 'react';

export const withDataFetch = (Component: ComponentType<any>, url: string) => {
	return (props: any) => {
		const [data, setData] = useState<unknown>(null);
		const [loading, setLoading] = useState(false);
		const [error, setError] = useState<string | null>(null);

		useEffect(() => {
			const controller = new AbortController();
			setLoading(true);

			fetchData(url, controller.signal)
				.then(({ data, error }) => {
					if (error) {
						setError(error);
						return;
					}
					setData(data);
					setError(null);
				})
				.finally(() => setLoading(false));

			return () => controller.abort();
		}, [url]);

		return <Component {...props} data={data} loading={loading} error={error} />;
	};
};

const fetchData = async (url: string, signal: AbortSignal) => {
	try {
		const response = await fetch(url, { signal });

		if (!response.ok) {
			throw new Error('Failed to fetch data');
		}

		const result = await response.json();
		return { data: result, error: null };
	} catch (error) {
		if (error instanceof Error) {
			return { data: null, error: error.message };
		} else {
			return { data: null, error: 'An unknown error occurred' };
		}
	}
};
