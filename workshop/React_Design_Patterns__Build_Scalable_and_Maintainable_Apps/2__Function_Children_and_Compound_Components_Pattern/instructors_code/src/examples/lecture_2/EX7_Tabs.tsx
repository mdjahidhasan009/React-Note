import {
	createContext,
	PropsWithChildren,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react';

type TabsContextProps = {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	registerTab: (tab: string) => void;
	isTabRegistered: (tab: string) => boolean;
};

const TabsContext = createContext<TabsContextProps | null>(null);

type TabsProps = {
	defaultTab?: string;
	children: ReactNode;
};

const Tabs = ({ defaultTab, children }: TabsProps) => {
	const [activeTab, setActiveTab] = useState(defaultTab || '');
	const [registeredTabs, setRegisteredTabs] = useState<string[]>([]);

	const registerTab = (tab: string) => {
		setRegisteredTabs((prev) => {
			if (prev.includes(tab)) return prev;
			return [...prev, tab];
		});
	};

	useEffect(() => {
		if (defaultTab && registeredTabs.includes(defaultTab)) {
			setActiveTab(defaultTab);
		} else if (registeredTabs.length > 0 && !activeTab) {
			setActiveTab(registeredTabs[0]);
		}
	}, [defaultTab, registeredTabs, activeTab]);

	const isTabRegistered = (tab: string) => registeredTabs.includes(tab);

	return (
		<TabsContext.Provider
			value={{ activeTab, setActiveTab, registerTab, isTabRegistered }}
		>
			<div className='w-full shadow-sm'>{children}</div>
		</TabsContext.Provider>
	);
};

const useTabs = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error('useTabs must be used within a Tabs component');
	}
	return context;
};

const TabList = ({
	children,
	className = '',
}: PropsWithChildren<{ className?: string }>) => {
	return (
		<div className={`flex border-b border-gray-300 bg-white ${className}`}>
			{children}
		</div>
	);
};

type TabProps = {
	id: string;
	disabled?: boolean;
	children: ReactNode;
	className?: string;
};

const Tab = ({ id, disabled = false, children, className = '' }: TabProps) => {
	const { activeTab, setActiveTab, registerTab, isTabRegistered } = useTabs();

	useEffect(() => {
		registerTab(id);
	}, [id, registerTab]);

	if (!isTabRegistered(id)) return null;

	return (
		<button
			className={`px-6 py-3 font-medium text-sm transition-all duration-200 relative
				${
					activeTab === id
						? 'text-gray-900 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900'
						: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
				} 
				${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
				${className}`}
			onClick={() => !disabled && setActiveTab(id)}
			disabled={disabled}
		>
			{children}
		</button>
	);
};

type TabPanelProps = {
	id: string;
	lazyLoad?: boolean;
	children: ReactNode;
	className?: string;
};

const TabPane = ({
	id,
	lazyLoad = false,
	children,
	className = '',
}: TabPanelProps) => {
	const { activeTab, isTabRegistered } = useTabs();

	if (!isTabRegistered(id)) return null;
	if (lazyLoad && activeTab !== id) return null;

	return activeTab === id ? (
		<div className={`p-6 bg-white ${className}`}>{children}</div>
	) : null;
};

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Pane = TabPane;

export default Tabs;
