import { useEffect, useState } from 'react';
import { useService } from './ServiceProvider';

type User = {
	id: number;
	name: string;
	email: string;
};

export const UserList = () => {
	const { api, logger } = useService();
	const [users, setUsers] = useState<User[]>([]);

	const fetchUsers = async () => {
		try {
			const users = await api.get<User[]>('/users');
			setUsers(users);
			logger.log(`Users fetched successfully: Total ${users.length} users`);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error';
			logger.error(`Failed to fetch users: ${message}`);
		}
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	return (
		<div>
			<h1>User List</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id} className='border-b py-4'>
						<p className='font-semibold text-lg'>{user.name}</p>
						<p className='text-muted text-sm'>{user.email}</p>
					</li>
				))}
			</ul>
		</div>
	);
};
