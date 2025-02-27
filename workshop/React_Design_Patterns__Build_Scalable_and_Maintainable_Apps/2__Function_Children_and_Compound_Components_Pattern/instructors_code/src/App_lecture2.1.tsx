import { ABTesting } from './demo/facp/ABTesting';

export default function App() {
	return (
		<div className='container mx-auto'>
			<ABTesting experiments={{ red: 10, blue: 20, green: 70 }}>
				{(variant) => {
					switch (variant) {
						case 'red':
							return (
								<div className='bg-red-500/10 rounded-md p-4 w-80'>Red</div>
							);
						case 'blue':
							return (
								<div className='bg-blue-500/10 rounded-md p-4 w-80'>Blue</div>
							);
						case 'green':
							return (
								<div className='bg-green-500/10 rounded-md p-4 w-80'>Green</div>
							);
						default:
							return null;
					}
				}}
			</ABTesting>
		</div>
	);
}
