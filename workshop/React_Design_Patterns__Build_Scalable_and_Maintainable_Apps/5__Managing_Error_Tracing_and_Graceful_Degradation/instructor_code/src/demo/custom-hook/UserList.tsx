import { useFetch } from './useFetch';

type User = {
	id: number;
	name: string;
	email: string;
};

export const UserList = () => {
	const { data, loading, error, refetch } = useFetch<User[]>(
		'https://jsonplaceholder.typicode.com/users'
	);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<h1 className='text-2xl font-bold'>User List</h1>
			<button onClick={refetch}>Refetch</button>
			<ul>
				{data?.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};
