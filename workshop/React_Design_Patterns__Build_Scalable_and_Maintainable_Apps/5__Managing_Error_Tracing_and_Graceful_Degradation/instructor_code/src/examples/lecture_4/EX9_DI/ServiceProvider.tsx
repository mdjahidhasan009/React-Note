import { PropsWithChildren, useContext } from 'react';
import { createContext } from 'react';
import { ApiClient, FetchApiClient } from './apiClient';
import { consoleLogger, Logger } from './logger';
import useSWR, { SWRResponse } from 'swr';

type ServiceProviderContext = {
	apiClient: ApiClient;
	logger: Logger;
	createFetcher: <T>(key: string) => () => SWRResponse<T>;
};

const ServiceContext = createContext<ServiceProviderContext | null>(null);

export const ServiceProvider = ({ children }: PropsWithChildren) => {
	return (
		<ServiceContext.Provider
			value={{
				apiClient: FetchApiClient,
				logger: consoleLogger,
				createFetcher,
			}}
		>
			{children}
		</ServiceContext.Provider>
	);
};

export const useService = () => {
	const context = useContext(ServiceContext);
	if (!context) {
		throw new Error('useService must be used within a ServiceProvider');
	}
	return context;
};

const createFetcher = <T,>(key: string) => {
	return () => {
		const { apiClient, logger } = useService();
		const fetcher = async () => {
			logger.log(`Fetching data for ${key}`);
			return apiClient.get<T>(key);
		};

		const response = useSWR<T>(key, fetcher); // can be swapped with useQuery from react-query

		if (response.error) {
			logger.error(`Error fetching data for ${key}: ${response.error}`);
		}

		return response;
	};
};
