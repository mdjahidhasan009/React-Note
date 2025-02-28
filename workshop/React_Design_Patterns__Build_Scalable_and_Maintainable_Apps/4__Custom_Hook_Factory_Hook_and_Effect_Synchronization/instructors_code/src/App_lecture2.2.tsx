// import { ABTest } from './examples/lecture_2/EX2_ABTest';
// import {
// 	PhotoPreviewer,
// 	StepWizard,
// 	Timeline,
// } from './examples/lecture_2/EX3_StepWizard';
// import PollingExample from './examples/lecture_2/EX4_Polling';
import { ThemeProvider } from './examples/lecture_2/EX5_ThemeProvider';

const photos = [
	'https://picsum.photos/400/300?random=1',
	'https://picsum.photos/400/300?random=2',
	'https://picsum.photos/400/300?random=3',
	'https://picsum.photos/400/300?random=4',
	'https://picsum.photos/400/300?random=5',
];

export default function App() {
	return (
		<ThemeProvider>
			<div className='container mx-auto'>
				{/* <PhotoPreviewer photos={photos} />

			<div className='my-8' />

			<Timeline steps={5} />
			<div className='my-8' />

			<StepWizard steps={3}>
				{({ currentStep, goToPrev, goToNext }) => (
					<div>
						<h1>Current Step {currentStep}</h1>
						<div className='flex gap-3'>
							<button onClick={goToPrev}>Prev</button>
							<button onClick={goToNext}>Next</button>
						</div>
					</div>
				)}
			</StepWizard> */}

				{/* <PollingExample /> */}
			</div>
		</ThemeProvider>
	);
}
