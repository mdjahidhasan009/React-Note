import axios from 'axios';
import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		setLoading(true);

		try {
			const response = await axios.get<T>(url);
			setData(response.data);
			setError(null);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : 'An unknown error occurred';
			setError(message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetchData();
		}

		return () => {
			isMounted = false;
		};
	}, [url]);

	return {
		data,
		loading,
		error,
		refetch: fetchData,
	};
};
