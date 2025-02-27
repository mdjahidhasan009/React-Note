import { withDataFetch } from './withDataFetch';

type BaseResponse = {
	data: unknown;
	loading: boolean;
	error: string | null;
};

type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

export const Users = ({ data, loading, error }: BaseResponse) => {
	const users = data as User[];

	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			<p className='text-2xl font-bold'>Users</p>
			{users && (
				<ul>
					{users.slice(0, 5).map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export const UsersWithData = withDataFetch(
	Users,
	'https://jsonplaceholder.typicode.com/users'
);

type Post = {
	id: number;
	title: string;
};

const Posts = ({ data, loading, error }: BaseResponse) => {
	const posts = data as Post[];

	return (
		<div>
			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}
			<p className='text-2xl font-bold'>Posts</p>
			{posts && (
				<ul>
					{posts.slice(0, 5).map((post) => (
						<li key={post.id}>{post.title}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export const PostsWithData = withDataFetch(
	Posts,
	'https://jsonplaceholder.typicode.com/posts'
);
