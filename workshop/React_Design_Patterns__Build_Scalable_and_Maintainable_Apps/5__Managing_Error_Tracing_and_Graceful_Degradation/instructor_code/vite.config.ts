import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: ['babel-plugin-react-compiler'],
			},
		}),
		tailwindcss(),
		sentryVitePlugin({
			org: 'stack-learner',
			project: 'javascript-react',
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},

	build: {
		sourcemap: true,
	},
});
