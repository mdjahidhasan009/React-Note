import { createContext, PropsWithChildren, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContext = {
	theme: Theme;
	toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContext | null>(null);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
	const [theme, setTheme] = useState<Theme>('light');

	const toggleTheme = () => {
		setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export const ThemeSwitcher = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('ThemeSwitcher must be used within a ThemeProvider');
	}

	return (
		<button
			onClick={context.toggleTheme}
			className={`${
				context.theme === 'light'
					? 'bg-black text-white'
					: 'bg-white text-black'
			} p-2 rounded-md`}
		>
			{context.theme === 'light' ? 'Dark Mode' : 'Light Mode'}
		</button>
	);
};

export const useTheme = () => {
	const context = useContext(ThemeContext);

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}

	return context;
};
