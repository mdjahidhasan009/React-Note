import { FeatureFlag } from './demo/ccp/FeatureFlag';

export default function App() {
	const flags = {
		newDashboard: false,
		betaFeature: true,
		adminPanel: true,
	};

	return (
		<div className='container mx-auto max-w-xl'>
			<FeatureFlag.Provider flags={flags} userRole='pro'>
				<div className='grid grid-cols-2 gap-4'>
					<FeatureFlag.Flag flag='newDashboard'>
						{(enabled) => (enabled ? <NewDashboard /> : <OldDashboard />)}
					</FeatureFlag.Flag>
					<FeatureFlag.Flag flag='betaFeature' requiredRole='pro'>
						{(enabled) =>
							enabled ? <BetaFeature /> : <p>Beta feature is disabled</p>
						}
					</FeatureFlag.Flag>
					<FeatureFlag.Flag flag='adminPanel' requiredRole='admin'>
						{(enabled) => (enabled ? <AdminPanel /> : null)}
					</FeatureFlag.Flag>
				</div>
			</FeatureFlag.Provider>
		</div>
	);
}

const NewDashboard = () => (
	<div className='bg-blue-500 text-white p-4 rounded-lg'>
		🚀 New Dashboard Enabled!
	</div>
);
const OldDashboard = () => (
	<div className='bg-gray-200 text-gray-800 p-4 rounded-lg'>
		🔙 Old Dashboard
	</div>
);
const BetaFeature = () => (
	<div className='bg-green-500 text-white p-4 rounded-lg'>
		🛠 Beta Feature Activated!
	</div>
);
const AdminPanel = () => (
	<div className='bg-red-500 text-white p-4 rounded-lg'>
		🔑 Admin Panel Access
	</div>
);

/**
 * The **Compound Component Pattern** in React allows multiple related components to work together as a single unit. Instead of passing multiple props to control child components, compound components communicate implicitly through **context or React’s `children` prop**.

This pattern is useful when you want to design **flexible, reusable UI components** that allow users to compose them in different ways.

**When to Use Compound Components? (Use Cases)**

- **Building UI libraries** – Tabs, Accordions, Dropdowns, Modals, etc.
- **Designing flexible, reusable components** – Form controls, Wizards.
- **When multiple components share a common state** – Controlled components.
- **Improving code readability & maintainability** – Reducing prop drilling.
 */
