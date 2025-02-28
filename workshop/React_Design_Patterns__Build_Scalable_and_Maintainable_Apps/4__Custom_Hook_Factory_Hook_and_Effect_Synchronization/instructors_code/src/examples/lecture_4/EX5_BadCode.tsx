import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

type User = {
	id: number;
	name: string;
	username: string;
	email: string;
};

type Theme = 'light' | 'dark';

// Messy component with everything inside
export const UserSearch = () => {
	const [users, setUsers] = useState<User[]>([]);
	const [search, setSearch] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>('');
	const [theme, setTheme] = useState<Theme>('light');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

	// Fetch Users API Call
	useEffect(() => {
		setLoading(true);
		axios
			.get<User[]>('https://jsonplaceholder.typicode.com/users')
			.then((res) => setUsers(res.data))
			.catch((err) => setError(err.message))
			.finally(() => setLoading(false));
	}, []);

	// Debounce Search
	useEffect(() => {
		const handler = setTimeout(() => {
			console.log('Searching:', search);
		}, 500);
		return () => clearTimeout(handler);
	}, [search]);

	// Handle click outside dropdown
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setDropdownOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	// Toggle theme
	const toggleTheme = () =>
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

	return (
		<div className={theme}>
			<button onClick={toggleTheme}>Toggle Theme</button>

			<input
				type='text'
				placeholder='Search users...'
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>

			{loading && <p>Loading...</p>}
			{error && <p>Error: {error}</p>}

			<ul>
				{users
					.filter((user) =>
						user.name.toLowerCase().includes(search.toLowerCase())
					)
					.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
			</ul>

			<div ref={dropdownRef}>
				<button onClick={() => setDropdownOpen(!isDropdownOpen)}>
					Open Dropdown
				</button>
				{isDropdownOpen && <div className='dropdown'>Dropdown Content</div>}
			</div>
		</div>
	);
};
