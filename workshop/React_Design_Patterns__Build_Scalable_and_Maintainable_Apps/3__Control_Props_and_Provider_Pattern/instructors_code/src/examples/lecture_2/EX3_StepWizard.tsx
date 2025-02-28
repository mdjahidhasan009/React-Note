import { ReactNode, useState } from 'react';

type StepRendererProps = {
	currentStep: number;
	totalSteps: number;
	goToNext: () => void;
	goToPrev: () => void;
	goToStep: (step: number) => void;
};

type StepWizardProps = {
	steps: number;
	children: (props: StepRendererProps) => ReactNode;
};

export const StepWizard = ({ steps, children }: StepWizardProps) => {
	const [currentStep, setCurrentStep] = useState(1);

	const goToNext = () =>
		setCurrentStep((prev) => (prev < steps ? prev + 1 : prev));
	const goToPrev = () => setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
	const goToStep = (step: number) => {
		if (step >= 1 && step <= steps) {
			setCurrentStep(step);
		}
	};

	return children({
		currentStep,
		totalSteps: steps,
		goToNext,
		goToPrev,
		goToStep,
	});
};


/**
 * Applications:
 */

// Photo Viewer

export const PhotoPreviewer = ({ photos }: { photos: string[] }) => {
	return (
		<StepWizard steps={photos.length}>
			{({ currentStep, goToNext, goToPrev, goToStep, totalSteps }) => (
				<div className='flex flex-col items-center gap-4'>
					<div className='relative w-full max-w-lg'>
						<img
							src={photos[currentStep - 1]}
							alt={`Photo ${currentStep}`}
							className='rounded-lg shadow-lg w-full'
						/>
						<button
							onClick={goToPrev}
							className='absolute left-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
						>
							Previous
						</button>
						<button
							onClick={goToNext}
							className='absolute right-4 top-1/2 -translate-y-1/2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'
						>
							Next
						</button>
					</div>
					<div className='flex gap-2'>
						{Array.from({ length: totalSteps }, (_, i) => (
							<button
								key={i}
								onClick={() => goToStep(i + 1)}
								className={`w-3 h-3 rounded-full ${
									currentStep === i + 1 ? 'bg-blue-500' : 'bg-gray-300'
								}`}
								aria-label={`Go to photo ${i + 1}`}
							/>
						))}
					</div>
				</div>
			)}
		</StepWizard>
	);
};

// Horizontal Timeline

type TimelineProps = {
	steps: number;
};

export const Timeline = ({ steps }: TimelineProps) => {
	return (
		<StepWizard steps={steps}>
			{({ currentStep, totalSteps, goToNext, goToPrev }) => (
				<div className='flex flex-col gap-4'>
					<div className='flex items-center w-full'>
						{Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
							<div key={step} className='flex items-center flex-1'>
								<div
									className={`w-8 h-8 rounded-full flex items-center justify-center 
										${currentStep === step ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
								>
									{step}
								</div>
								{step < totalSteps && (
									<div
										className={`flex-1 h-1 mx-2 
											${step < currentStep ? 'bg-blue-500' : 'bg-gray-200'}`}
									/>
								)}
							</div>
						))}
					</div>
					<div className='flex gap-2 justify-center'>
						<button
							className='bg-blue-500 text-white p-2 rounded-md'
							onClick={goToPrev}
						>
							Previous
						</button>
						<button
							className='bg-blue-500 text-white p-2 rounded-md'
							onClick={goToNext}
						>
							Next
						</button>
					</div>
				</div>
			)}
		</StepWizard>
	);
};