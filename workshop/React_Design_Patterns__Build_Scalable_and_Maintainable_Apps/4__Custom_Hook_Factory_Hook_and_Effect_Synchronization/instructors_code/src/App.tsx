import { ServiceProvider } from './examples/lecture_4/EX9_DI/ServiceProvider';
import { Users } from './examples/lecture_4/EX9_DI/Users';

export default function App() {
	return (
		<ServiceProvider>
			<div className='container mx-auto'>
				<Users />
			</div>
		</ServiceProvider>
	);
}
