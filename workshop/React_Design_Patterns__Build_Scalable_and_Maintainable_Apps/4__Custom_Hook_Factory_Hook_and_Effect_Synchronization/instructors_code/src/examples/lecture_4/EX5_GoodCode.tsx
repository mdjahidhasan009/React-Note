import { useState } from 'react';
import { useDebounce } from './EX3_UseDebounce';
import { useFetch } from './EX2_UseFetch';
import { useClickOutside } from './EX4_UseClickOutside';

type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

type Theme = 'light' | 'dark';

// Custom hook for theme management
const useTheme = (initialTheme: Theme = 'light') => {
	const [theme, setTheme] = useState<Theme>(initialTheme); // => should use context but for simplicity using state
	const toggleTheme = () =>
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	return { theme, toggleTheme };
};

// Custom hook for filtered users
// => does not need as hook, but for demonstration we can use utility function/service
const useFilteredUsers = (users: User[], searchTerm: string) => {
	return users.filter((user) =>
		user.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
};

// Clean component using custom hooks
export const UserSearch = () => {
	const [search, setSearch] = useState<string>('');
	const debouncedSearch = useDebounce(search);
	const { theme, toggleTheme } = useTheme('light');
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const {
		data: users = [],
		loading,
		error,
	} = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

	const dropdownRef = useClickOutside<HTMLDivElement>(() =>
		setDropdownOpen(false)
	);
	const filteredUsers = useFilteredUsers(users ?? [], debouncedSearch);

	return (
		<div className={theme}>
			<div className='flex gap-3'>
				<button
					onClick={toggleTheme}
					className='bg-blue-500 text-white p-2 rounded-md'
				>
					{theme === 'light' ? 'Dark Mode' : 'Light Mode'}
				</button>
				<div ref={dropdownRef}>
					<button
						onClick={() => setDropdownOpen(!isDropdownOpen)}
						className='bg-blue-500 text-white p-2 rounded-md'
					>
						Open Dropdown
					</button>
					{isDropdownOpen && <div className='dropdown'>Dropdown Content</div>}
				</div>
			</div>

			<div className='my-4'>
				<input
					type='text'
					placeholder='Search users...'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className='border border-gray-300 rounded-md p-2'
				/>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}

			<ul>
				{filteredUsers.map((user) => (
					<li key={user.id}>{user.name}</li>
				))}
			</ul>
		</div>
	);
};
