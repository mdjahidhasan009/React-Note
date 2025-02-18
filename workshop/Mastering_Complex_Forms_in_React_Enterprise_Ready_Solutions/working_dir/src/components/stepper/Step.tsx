import { ReactNode } from 'react';
import { TStepError, useStepperContext } from './stepper.context';

export type TStepProps = {
    children: ReactNode;
    validate?: () => TStepError | Promise<TStepError>;
}

export const Step = ({ children }: TStepProps) => {
    const { currentStep, stepErrors } = useStepperContext();
    const error = stepErrors[currentStep];

    return (
        <div className="p-2">
            {error?.hasError && error.message && (
                <div className="text-center mb-4">
                    <p className="text-destructive text-sm">{error.message}</p>
                </div>
            )}

            {children}
        </div>
    )
}
