import { Component, ErrorInfo, ReactNode } from 'react';
import * as Sentry from '@sentry/react';

type Props = {
	children: ReactNode;
	fallback?: ReactNode;
};

type State = {
	hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
		Sentry.captureException(error, {
			extra: {
				errorInfo,
			},
		});
		console.log('Error Capture');
		console.error(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				this.props.fallback ?? (
					<div className='text-red-500'>Something went wrong</div>
				)
			);
		}

		return this.props.children;
	}
}
