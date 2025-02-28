import { useUsers } from './createApiHook';

export const UserList = () => {
	const { data, loading, error } = useUsers();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{data?.map((user) => (
				<div key={user.id}>{user.name}</div>
			))}
		</div>
	);
};
