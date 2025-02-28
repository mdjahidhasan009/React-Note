import { useEffect, useState } from 'react';

const createPersistedState = <T>(key: string, initialValue: T) => {
	return () => {
		const [state, setState] = useState<T>(() => {
			const storedValue = localStorage.getItem(key);
			return storedValue ? JSON.parse(storedValue) : initialValue;
		});

		useEffect(() => {
			localStorage.setItem(key, JSON.stringify(state)); // side effect
		}, [state]);

		// const persist = (state: T) => {
		// 	setState(() => {
		// 		localStorage.setItem(key, JSON.stringify(state));
		// 		return state;
		// 	});
		// };

		return [state, setState] as const;
	};
};

export const useTheme = createPersistedState<string>('theme', 'light');

type User = {
	id: number;
	name: string;
	email: string;
};

export const useUser = createPersistedState<User | null>('user', null);

type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

export const useCart = createPersistedState<CartItem[]>('cart', []);
