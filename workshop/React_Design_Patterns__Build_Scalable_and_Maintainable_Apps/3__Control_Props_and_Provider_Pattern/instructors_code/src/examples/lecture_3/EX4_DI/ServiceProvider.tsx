import { PropsWithChildren, useContext } from 'react';
import { createContext } from 'react';
import { ApiClient, FetchApiClient } from './apiClient';
import { consoleLogger, Logger } from './logger';

type ServiceProviderContext = {
	apiClient: ApiClient;
	logger: Logger;
};

const ServiceContext = createContext<ServiceProviderContext | null>(null);

export const ServiceProvider = ({ children }: PropsWithChildren) => {
	return (
		<ServiceContext.Provider
			value={{
				apiClient: FetchApiClient,
				logger: consoleLogger,
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
