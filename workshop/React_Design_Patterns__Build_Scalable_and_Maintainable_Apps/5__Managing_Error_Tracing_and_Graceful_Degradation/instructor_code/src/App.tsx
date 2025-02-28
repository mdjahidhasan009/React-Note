import { Suspense } from 'react';
import { UserList, UserSkeleton } from './examples/lecture_5/UserList';
import { fetchUsers, fetchPosts } from './examples/lecture_5/lib';
import { PostList, PostSkeleton } from './examples/lecture_5/PostList';
import { ErrorBoundary } from './examples/lecture_5/ErrorBoundary';
import { ErrorFallback } from './examples/lecture_5/ErrorFallback';

export default function App() {
	return (
		<div className='container mx-auto'>
			<div className='flex justify-end'>
				<button
					className='bg-red-500 text-white p-2 rounded'
					onClick={() => {
						throw new Error('Test Error');
					}}
				>
					Throw Error
				</button>
			</div>
			{/* <div className='grid grid-cols-1 md:grid-cols-2 gap-4'> */}
			{/* <ErrorBoundary
					fallback={<ErrorFallback errorMessage='Failed to fetch users' />}
				>
					<Suspense fallback={<UserSkeleton />}>
						<UserList userPromise={fetchUsers()} />
					</Suspense>
				</ErrorBoundary> */}
			<ErrorBoundary
				fallback={
					<div>
						<ErrorFallback errorMessage='Failed to fetch posts' />
					</div>
				}
			>
				<Suspense fallback={<PostSkeleton />}>
					<PostList postPromise={fetchPosts()} />
				</Suspense>
			</ErrorBoundary>
			{/* </div> */}
		</div>
	);
}
