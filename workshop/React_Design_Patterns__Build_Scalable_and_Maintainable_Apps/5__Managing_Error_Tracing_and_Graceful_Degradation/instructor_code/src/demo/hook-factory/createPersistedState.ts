import { useEffect, useState } from 'react';

export const createPersistedState = <T>(key: string, initialValue: T) => {
	return () => {
		const [state, setState] = useState<T>(() => {
			const storedValue = localStorage.getItem(key);
			return storedValue ? JSON.parse(storedValue) : initialValue;
		});

		useEffect(() => {
			localStorage.setItem(key, JSON.stringify(state));
		}, [state]);

		return [state, setState] as const;
	};
};

type CartItem = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

export const useCartState = createPersistedState<CartItem[]>('cart', []);
