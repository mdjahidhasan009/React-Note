import axios from 'axios';

export type ApiClient = {
	baseUrl: string;
	get: <T>(path: string) => Promise<T>;
	post: <T extends object, R extends T = T>(
		path: string,
		data: T
	) => Promise<R>;
};

export const FetchApiClient: ApiClient = {
	baseUrl: 'https://jsonplaceholder.typicode.com',

	get: async <T>(path: string) => {
		const response = await fetch(`${FetchApiClient.baseUrl}${path}`);
		return response.json() as Promise<T>;
	},

	post: async <T extends object, R extends T = T>(path: string, data: T) => {
		const response = await fetch(`${FetchApiClient.baseUrl}${path}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.json() as Promise<R>;
	},
};

export const AxiosApiClient: ApiClient = {
	baseUrl: 'https://jsonplaceholder.typicode.com',

	get: async <T>(path: string) => {
		const response = await axios.get<T>(`${AxiosApiClient.baseUrl}${path}`);
		return response.data;
	},

	post: async <T extends object, R extends T = T>(path: string, data: T) => {
		const response = await axios.post<R>(
			`${AxiosApiClient.baseUrl}${path}`,
			data
		);
		return response.data;
	},
};
