import { Suspense, use, useState } from 'react';
import { User } from './UserList';
import { fetchPost, fetchUser } from './lib';
import { ErrorBoundary } from './ErrorBoundary';
import { ErrorFallback } from './ErrorFallback';

export type Post = {
	id: number;
	title: string;
	userId: number;
};

type Props = {
	postPromise: Promise<Post[]>;
};

export const PostList = ({ postPromise }: Props) => {
	const posts = use(postPromise);
	const [selectedPost, setSelectedPost] = useState<number | null>(null);

	return (
		<div className='max-w-4xl mx-auto p-4'>
			<div className='mb-4'>
				<h1 className='text-lg font-medium'>Post List</h1>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div className='flex flex-col gap-2'>
					{posts.slice(0, 10).map((post) => (
						<div
							key={post.id}
							className='bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow cursor-pointer'
							onClick={() => setSelectedPost(post.id)}
						>
							<h3 className='text-xl font-semibold text-gray-800 mb-2'>
								{post.title}
							</h3>
						</div>
					))}
				</div>
				<div>
					{selectedPost ? (
						<ErrorBoundary fallback={<ErrorFallback />}>
							<Suspense fallback={<div>Loading Post...</div>}>
								<PostDetail postPromise={fetchPost(selectedPost)} />
							</Suspense>
						</ErrorBoundary>
					) : (
						<div className='text-sm text-gray-800 mb-2'>
							<p>No post selected</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const PostSkeleton = () => {
	return (
		<div className='animate-pulse'>
			<div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
			<div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
			<div className='h-4 bg-gray-200 rounded w-full'></div>
		</div>
	);
};

type ShowAuthorProps = {
	authorPromise: Promise<User>;
};

const ShowAuthor = ({ authorPromise }: ShowAuthorProps) => {
	const author = use(authorPromise);

	return (
		<div>
			<h3 className='text-sm text-gray-800 mb-2'>{author.name}</h3>
		</div>
	);
};

type PostDetailProps = {
	postPromise: Promise<Post & { body: string }>;
};

const PostDetail = ({ postPromise }: PostDetailProps) => {
	const post = use(postPromise);

	return (
		<div className='text-sm text-gray-800 mb-2'>
			<p className='text-xl font-semibold mb-2'>{post.title}</p>
			<p className='text-muted-foreground'>{post.body}</p>
			<ErrorBoundary
				fallback={
					<p className='text-sm text-red-500'>Failed to Fetch Author</p>
				}
			>
				<Suspense fallback={<div>Loading Author...</div>}>
					<ShowAuthor authorPromise={fetchUser(post.userId)} />
				</Suspense>
			</ErrorBoundary>
		</div>
	);
};
