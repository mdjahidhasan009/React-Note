import {ReactNode, useState} from "react";
import {StepperContext, TStepError} from "@/components/stepper/stepper.context.tsx";
import {getSteps, useStepContent} from "@/components/stepper/stepper.hooks.ts";
import {Step} from "./Step.tsx";
import {StepConnector, StepIndicator} from "@/components/stepper/StepIndicator.tsx";
import {Button} from "@/components/ui/button.tsx";

type TStepperProps = {
    children: ReactNode;
    onComplete?: () => void | Promise<void>;
    completeLabel?: string;
}

export const Stepper = ({ children, onComplete, completeLabel = 'Complete' }: TStepperProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [stepErrors, setStepErrors] = useState<Record<number, TStepError>>({});

    const steps = getSteps(children);
    const totalSteps = steps.length;

    return (
        <StepperContext.Provider
            value={{
                currentStep,
                setCurrentStep,
                totalSteps,
                stepErrors,
                setStepErrors,
            }}
        >
            <StepContent onComplete={onComplete} completeLabel={completeLabel}>
                {children}
            </StepContent>
        </StepperContext.Provider>
    )
}

Stepper.displayName = 'Stepper';
Stepper.Step = Step;

type TStepContentProps = {
    children: ReactNode;
    onComplete?: () => void | Promise<void>;
    completeLabel?: string;
}

const StepContent = ({ children, onComplete, completeLabel }: TStepContentProps) => {
    const { currentStep, totalSteps, stepErrors, handleNext, handlePrevious, steps } = useStepContent(children);

    return (
        <div
            className="flex flex-col h-full gap-4"
            role="region"
            aria-label="Step progress"
        >
            <div className="flex items-center px-8 mt-3">
                <div className="flex items-center w-full">
                    {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
                        <div key={step} className="flex items-center flex-1 last:flex-none">
                            <StepIndicator
                                step={step}
                                error={stepErrors[step]}
                                isActive={currentStep === step}
                                isCompleted={currentStep > step}
                            />

                            {step < totalSteps && (
                                <StepConnector
                                    isCompleted={
                                        currentStep > step &&
                                        !stepErrors[step]?.hasError
                                    }
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">{steps[currentStep - 1]}</div>

            <div className="flex justify-between py-4 border-t">
                <Button
                    type='button'
                    variant='outline'
                    size='sm'
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                >
                    Previous
                </Button>
                <Button
                    type='button'
                    size='sm'
                    onClick={() => handleNext(onComplete)}
                    disabled={currentStep > totalSteps}
                >
                    {currentStep === totalSteps ? completeLabel : 'Next'}
                </Button>
            </div>
        </div>
    )
}

StepContent.displayName = 'StepContent';
