import { useService } from './ServiceProvider';

type User = {
	id: number;
	name: string;
	email: string;
};

export const Users = () => {
	const { createFetcher } = useService();
	const useFetchUsers = createFetcher<User[]>('/users');
	const { data: users, error, isLoading } = useFetchUsers();

	return (
		<div>
			<h1>Users</h1>
			{isLoading && <p>Loading...</p>}
			{error && <p>Error: {error.message}</p>}
			<ul>
				{users?.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};
