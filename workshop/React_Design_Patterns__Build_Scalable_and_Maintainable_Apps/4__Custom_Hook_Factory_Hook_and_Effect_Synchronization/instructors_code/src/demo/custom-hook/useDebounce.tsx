import { useEffect, useState } from 'react';

export const useDebounce = <T,>(value: T, delay = 500): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [value, delay]);

	return debouncedValue;
};

export const SearchBar = () => {
	const [search, setSearch] = useState('');
	const debouncedSearch = useDebounce(search, 300);

	useEffect(() => {
		if (debouncedSearch) {
			// DO API Call
			console.log('Searching for:', debouncedSearch);
		}
	}, [debouncedSearch]);

	return (
		<input
			type='search'
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			placeholder='Search...'
			className='border border-gray-300 rounded-md p-2'
		/>
	);
};
