// main fine example in src/examples/lecture_2/EX8_FeatureFlag.tsx
import { createContext, ReactNode, useContext } from 'react';

type FeatureFlagContext = {
	isFeatureEnabled: (flag: string) => boolean;
	userRole: string;
};

const FeatureFlagContext = createContext<FeatureFlagContext | null>(null);

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
		<FeatureFlagContext value={{ isFeatureEnabled, userRole }}>
			{children}
		</FeatureFlagContext>
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
	flag: string;
	requiredRole?: string;
	children: (enabled: boolean) => ReactNode;
};

const Flag = ({ flag, requiredRole, children }: FeatureFlagProps) => {
	const { isFeatureEnabled, userRole } = useFeatureFlag();
	const enabled =
		isFeatureEnabled(flag) && (!requiredRole || userRole === requiredRole);

	return children(enabled);
};

export const FeatureFlag = {
	Provider: FeatureFlagProvider,
	Flag: Flag,
};
