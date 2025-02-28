import axios from 'axios';
import { useEffect, useState } from 'react';

export const createApiHook = <T>(url: string) => {
	return () => {
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
				const errorMessage =
					error instanceof Error ? error.message : 'An unknown error occurred';
				setError(errorMessage);
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

		return { data, loading, error, refetch: fetchData };
	};
};

export type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

export const useUsers = createApiHook<User[]>(
	'https://jsonplaceholder.typicode.com/users'
);

type Post = {
	id: number;
	title: string;
	body: string;
	userId: number;
};

export const usePosts = createApiHook<Post[]>(
	'https://jsonplaceholder.typicode.com/posts'
);

type Comment = {
	id: number;
	postId: number;
	body: string;
	userId: number;
};

export const useComments = createApiHook<Comment[]>(
	'https://jsonplaceholder.typicode.com/comments'
);
