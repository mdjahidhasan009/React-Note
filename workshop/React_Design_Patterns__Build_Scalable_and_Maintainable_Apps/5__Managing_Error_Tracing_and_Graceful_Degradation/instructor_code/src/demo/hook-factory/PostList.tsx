import { usePosts } from './createApiHook';

export const UserList = () => {
	const { data, loading, error } = usePosts();

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			{data?.map((post) => (
				<div key={post.id}>{post.title}</div>
			))}
		</div>
	);
};
