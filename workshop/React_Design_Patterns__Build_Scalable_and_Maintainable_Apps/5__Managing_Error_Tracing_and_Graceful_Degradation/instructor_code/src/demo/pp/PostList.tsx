import { useEffect, useState } from 'react';
import { useService } from './ServiceProvider';

type Post = {
	id: number;
	title: string;
};

export const PostList = () => {
	const { api, logger } = useService();
	const [posts, setPosts] = useState<Post[]>([]);

	const fetchPosts = async () => {
		try {
			const posts = await api.get<Post[]>('/posts');
			setPosts(posts);
			logger.log(`Posts fetched successfully: Total ${posts.length} posts`);
		} catch (error) {
			const message = error instanceof Error ? error.message : 'Unknown error';
			logger.error(`Failed to fetch posts: ${message}`);
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<div>
			<h1>Post List</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>{post.title}</li>
				))}
			</ul>
		</div>
	);
};
