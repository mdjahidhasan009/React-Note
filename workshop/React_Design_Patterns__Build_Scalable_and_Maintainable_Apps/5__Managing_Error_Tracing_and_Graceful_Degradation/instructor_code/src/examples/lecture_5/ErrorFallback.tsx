interface ErrorFallbackProps {
	title?: string;
	errorMessage?: string;
	resetError?: () => void;
}

export const ErrorFallback = ({
	title = 'Oops! Something went wrong',
	errorMessage = 'An unexpected error occurred',
	resetError,
}: ErrorFallbackProps) => {
	return (
		<div className='border-l-4 border-red-500 bg-red-50 p-4 rounded-r'>
			<div className='flex items-start'>
				<div className='flex-shrink-0'>
					<svg
						className='w-8 h-8 text-red-500 mt-0.5'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
						/>
					</svg>
				</div>
				<div className='ml-4'>
					<h3 className='text-xl font-medium text-red-800'>{title}</h3>
					<p className='text-sm text-red-700 mt-1'>{errorMessage}</p>
					{resetError && (
						<button
							onClick={resetError}
							className='mt-2 text-sm text-red-600 hover:text-red-800 font-medium'
						>
							Try again
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
