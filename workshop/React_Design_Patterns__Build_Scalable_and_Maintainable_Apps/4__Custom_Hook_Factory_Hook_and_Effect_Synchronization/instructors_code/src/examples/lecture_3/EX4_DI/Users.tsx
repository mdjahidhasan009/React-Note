import { useEffect, useState } from 'react';
import { useService } from './ServiceProvider';

type User = {
	id: number;
	name: string;
	email: string;
};

export const Users = () => {
	const { apiClient, logger } = useService();
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsers = async () => {
		try {
			const users = await apiClient.get<User[]>('/users');
			logger.log(`Fetched ${users.length} users`);
			setUsers(users);
		} catch (error) {
			logger.error(`Error fetching users: ${error}`);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return (
		<div>
			<h1>Users</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};
