import axios from 'axios';

export type ApiClient = {
	baseUrl: string;
	get<T>(url: string): Promise<T>;
	post<T extends object, R extends T = T>(url: string, data: T): Promise<R>;
};

export const FetchApiClient: ApiClient = {
	baseUrl: 'https://jsonplaceholder.typicode.com',

	get: async <T>(url: string): Promise<T> => {
		const response = await fetch(`${FetchApiClient.baseUrl}${url}`);
		return response.json();
	},

	post: async <T extends object, R extends T = T>(
		url: string,
		data: T
	): Promise<R> => {
		const response = await fetch(`${FetchApiClient.baseUrl}${url}`, {
			method: 'POST',
			body: JSON.stringify(data),
		});
		return response.json();
	},
};

export const AxiosApiClient: ApiClient = {
	baseUrl: 'https://jsonplaceholder.typicode.com',
	get: async <T>(url: string): Promise<T> => {
		const response = await axios.get<T>(`${AxiosApiClient.baseUrl}${url}`);
		return response.data;
	},
	post: async <T extends object, R extends T = T>(
		url: string,
		data: T
	): Promise<R> => {
		const response = await axios.post<R>(
			`${AxiosApiClient.baseUrl}${url}`,
			data
		);
		return response.data;
	},
};
