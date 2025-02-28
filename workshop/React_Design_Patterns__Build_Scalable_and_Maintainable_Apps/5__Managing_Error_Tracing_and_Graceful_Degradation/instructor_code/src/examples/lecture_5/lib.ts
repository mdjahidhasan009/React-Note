import { Post } from './PostList';
import { User } from './UserList';

export const sleep = (ms: number) =>
	new Promise((resolve) => setTimeout(resolve, ms));

export const fetchUsers = async () => {
	await sleep(2000);
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	const data = await response.json();
	return data as User[];
};

export const fetchPosts = async () => {
	await sleep(2000);
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const data = await response.json();
	return data as Post[];
};

export const fetchPost = async (id: number) => {
	await sleep(2000);
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${id}`
	);
	const data = await response.json();
	return data as Post & { body: string };
};

export const fetchUser = async (id: number) => {
	await sleep(1000);
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/users/${id}`
	);
	const data = await response.json();
	return data as User;
};
