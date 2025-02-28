import { use } from 'react';

export type User = {
	id: number;
	name: string;
	email: string;
};

type Props = {
	userPromise: Promise<User[]>;
};

export const UserList = ({ userPromise }: Props) => {
	const users = use(userPromise);
	return (
		<div className='max-w-4xl mx-auto p-4'>
			<div className='mb-4'>
				<h1 className='text-lg font-medium'>User List</h1>
			</div>
			{users.map((user) => (
				<div
					key={user.id}
					className='bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow'
				>
					<h3 className='text-xl font-semibold text-gray-800 mb-2'>
						{user.name}
					</h3>
					<p className='text-gray-600'>{user.email}</p>
				</div>
			))}
		</div>
	);
};

export const UserSkeleton = () => {
	return (
		<div className='animate-pulse'>
			<div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
			<div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
			<div className='h-4 bg-gray-200 rounded w-full'></div>
		</div>
	);
};
