import { createContext, PropsWithChildren, useContext } from 'react';
import { ApiClient, AxiosApiClient, FetchApiClient } from './apiClient';
import { ConsoleLogger, Logger } from './logger';

type ServiceProviderContext = {
	api: ApiClient;
	logger: Logger;
};

const ServiceContext = createContext<ServiceProviderContext | null>(null);

export const ServiceProvider = ({ children }: PropsWithChildren) => {
	return (
		<ServiceContext
			value={{
				api: AxiosApiClient,
				logger: ConsoleLogger,
			}}
		>
			{children}
		</ServiceContext>
	);
};

export const useService = () => {
	const context = useContext(ServiceContext);

	if (!context) {
		throw new Error('useService must be used within a ServiceProvider');
	}

	return context;
};
