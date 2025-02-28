import { MouseTracker } from './examples/lecture_1/EX5_RP1';
import { DisableContextMenu } from './examples/lecture_1/EX6_RP2';
import { ListRenderer } from './examples/lecture_1/EX7_RP3';

export default function App() {
	return (
		<div className='container mx-auto ma-w-xl'>
			<div className='flex gap-8'>
				<MouseTracker
					render={(x, y) => (
						<div className='border-2 border-dashed w-80 h-80 bg-emerald-50 p-4'>
							<h2>Mouse Tracker</h2>
							<p>X: {x}</p>
							<p>Y: {y}</p>
						</div>
					)}
				/>

				<MouseTracker
					render={(x, y) => (
						<div className='w-80 grid grid-cols-2 gap-4'>
							<div className='border-1 border-green-500 border-dashed bg-green-500/10 text-slate-900 p-4'>
								<h2>X: {x}</h2>
							</div>
							<div className='border-1 border-orange-500 border-dashed bg-orange-500/10 text-slate-900 p-4'>
								<h2>Y: {y}</h2>
							</div>
						</div>
					)}
				/>
			</div>

			<div className='my-4' />
			<div>
				<DisableContextMenu
					className='w-full h-40 border-blue-500 bg-blue-500/10 p-4'
					render={() => (
						<div>
							<h1 className='text-2xl font-bold'>Disable Context Menu</h1>
							<p>Right click on the div below to see the difference</p>
						</div>
					)}
				/>
			</div>

			<div className='my-4' />
			<div className='flex gap-8'>
				<div className='w-full'>
					<ListRenderer items={['Item 1', 'Item 2', 'Item 3']} />
				</div>
				<div className='w-full'>
					<ListRenderer
						items={['Item 1', 'Item 2', 'Item 3']}
						render={(item, index) => (
							<div
								className={`p-2 ${
									index % 2 === 0
										? 'bg-orange-500/10 text-orange-500'
										: 'bg-blue-500/10 text-blue-500'
								} p-4`}
							>
								{item}
							</div>
						)}
					/>
				</div>
			</div>
		</div>
	);
}
