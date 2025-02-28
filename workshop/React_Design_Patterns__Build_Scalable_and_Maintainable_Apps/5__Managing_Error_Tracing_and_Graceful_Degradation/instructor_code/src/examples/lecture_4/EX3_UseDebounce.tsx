import { useState, useEffect } from 'react';

export const useDebounce = <T,>(value: T, delay: number = 500): T => {
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
	const debouncedSearch = useDebounce(search);

	useEffect(() => {
		if (debouncedSearch) {
			console.log('Fetching results for:', debouncedSearch);
		}
	}, [debouncedSearch]);

	return (
		<input
			type='text'
			value={search}
			onChange={(e) => setSearch(e.target.value)}
			placeholder='Search...'
		/>
	);
};
