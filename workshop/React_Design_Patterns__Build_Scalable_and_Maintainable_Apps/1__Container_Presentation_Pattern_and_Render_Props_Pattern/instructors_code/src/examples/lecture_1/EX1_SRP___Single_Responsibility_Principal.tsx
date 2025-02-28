import { useEffect, useMemo, useState } from 'react';

/**
 * Bad Example:
 * - The Dashboard component is responsible for displaying the user profile, notifications, and tasks.
 * - This violates the Single Responsibility Principle (SRP) because the component is responsible for more than one thing.
 */

export const DashboardBad = () => {
	const [user, _setUser] = useState({
		name: 'John Doe',
		email: 'john@example.com',
	});
	const [notifications, _setNotifications] = useState([
		'New message',
		'Server update',
	]);
	const [tasks, _setTasks] = useState(['Finish report', 'Update project']);

	return (
		<div>
			<h1>Dashboard</h1>

			{/* User Profile */}
			<div>
				<h2>User Profile</h2>
				<p>Name: {user.name}</p>
				<p>Email: {user.email}</p>
			</div>

			{/* Notifications */}
			<div>
				<h2>Notifications</h2>
				<ul>
					{notifications.map((n, i) => (
						<li key={i}>{n}</li>
					))}
				</ul>
			</div>

			{/* Tasks */}
			<div>
				<h2>Tasks</h2>
				<ul>
					{tasks.map((t, i) => (
						<li key={i}>{t}</li>
					))}
				</ul>
			</div>
		</div>
	);
};












/**
 * Good Example
 */

// This DashboardGood is container component, it is responsible for managing the state and passing the data to the
// presentational components, business logic, and API calls.
export const DashboardGood = () => {
	const [notifications, _setNotifications] = useState([
		'New message',
		'Server update',
	]);
	const [tasks, _setTasks] = useState(['Finish report', 'Update project']);

	return (
		<div>
			<h1>Dashboard</h1>
			<UserProfile /> {/* Memoize */}
			<Notifications notifications={notifications} /> {/* Memoize */}
			<Tasks tasks={tasks} /> {/* Memoize */}
		</div>
	);
};


// We make UserProfile a container component, so it will fetch the data from the API, and will manage the state of user
// as this data does not require to be shared with other components, so we are using colocation pattern to manage the
// state of user in this component. By doing so other components will not be able to access the user state also will not
// trigger unnecessary re-renders at DashboardGood component.
type User = {
	name: string;
	email: string;
};

const UserProfile = () => {
	const [user, _setUser] = useState<User>({
		name: 'John Doe',
		email: 'john@example.com',
	});

	useEffect(() => {
		// DO API CALL
		// Do Additional Logic
	}, []);

	const computedUser = useMemo(() => {
		// Do Additional Logic
		return user;
	}, [user]);

	const updateUser = (user: User) => {
		// API CALL
		// Do Additional Logic
		_setUser(user);
	};

	return <UserProfileContent user={computedUser} onUpdate={updateUser} />;
};

const UserProfileContent = ({
	user,
	onUpdate,
}: {
	user: User;
	onUpdate: (user: User) => void;
}) => {
	return (
		<div>
			<h2>User Profile</h2>
			<p>Name: {user.name}</p>
			<p>Email: {user.email}</p>
			<button
				onClick={() =>
					onUpdate({ name: 'John Doe', email: 'john@example.com' })
				}
			>
				Update
			</button>
		</div>
	);
};

const Notifications = ({ notifications }: { notifications: string[] }) => {
	return (
		<div>
			<h2>Notifications</h2>
			<ul>
				{notifications.map((n, i) => (
					<li key={i}>{n}</li>
				))}
			</ul>
		</div>
	);
};

const Tasks = ({ tasks }: { tasks: string[] }) => {
	return (
		<div>
			<h2>Tasks</h2>
			<ul>
				{tasks.map((t, i) => (
					<li key={i}>{t}</li>
				))}
			</ul>
		</div>
	);
};
