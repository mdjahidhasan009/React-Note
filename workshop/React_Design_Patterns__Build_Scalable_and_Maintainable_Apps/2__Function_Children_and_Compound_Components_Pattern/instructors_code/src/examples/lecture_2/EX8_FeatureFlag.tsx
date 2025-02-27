import { createContext, ReactNode, useContext } from 'react';

type FeatureFlagContextProps = {
	isFeatureEnabled: (flag: string) => boolean;
	userRole: string;
};

const FeatureFlagContext = createContext<FeatureFlagContextProps | null>(null);

type FeatureFlagProviderProps = {
	flags: Record<string, boolean>;
	userRole: string;
	children: ReactNode;
};

const FeatureFlagProvider = ({
	flags,
	userRole,
	children,
}: FeatureFlagProviderProps) => {
	const isFeatureEnabled = (flag: string) => !!flags[flag];

	return (
		<FeatureFlagContext.Provider value={{ isFeatureEnabled, userRole }}>
			{children}
		</FeatureFlagContext.Provider>
	);
};

const useFeatureFlag = () => {
	const context = useContext(FeatureFlagContext);

	if (!context) {
		throw new Error('useFeatureFlag must be used within a FeatureFlagProvider');
	}

	return context;
};

type FeatureFlagProps = {
	name: string;
	requiredRole?: string;
	children: (enabled: boolean) => ReactNode;
};

const FeatureFlag = ({ name, requiredRole, children }: FeatureFlagProps) => {
	const { isFeatureEnabled, userRole } = useFeatureFlag();

	const enabled =
		isFeatureEnabled(name) && (!requiredRole || userRole === requiredRole);

	return children(enabled);
};

FeatureFlag.Provider = FeatureFlagProvider;
FeatureFlag.Flag = FeatureFlag;

export default FeatureFlag;
