import {Children, isValidElement, ReactElement, ReactNode} from "react";
import {TStepError, useStepperContext} from "./stepper.context.tsx";
import {Step, TStepProps} from "./Step.tsx";

export const useStepContent = (children: ReactNode) => {
    const { currentStep, setCurrentStep, totalSteps, stepErrors, setStepErrors } = useStepperContext();

    const steps = getSteps(children);



    const validateStep = async (step: number): Promise<TStepError> => {
        const currentChild = steps[step-1] as ReactElement<TStepProps>;
        if(currentChild.props?.validate) {
            return await currentChild.props.validate();
        }

        return { hasError: false };
    }

    const handleNext = async (onComplete?: () => void | Promise<void>): Promise<void> => {
        const error = await validateStep(currentStep);
        if(error.hasError) {
            setStepErrors({ [currentStep]: error });
            return;
        }

        setStepErrors({ [currentStep]: { hasError: false } });

        if(currentStep === totalSteps && onComplete) {
            await onComplete();
            return;
        }

        if(currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    }

    const handlePrevious = (): void => {
        if(currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    }

    return {
        currentStep,
        totalSteps,
        stepErrors,
        handleNext,
        handlePrevious,
        steps,
    }
}


export const getSteps = (children: ReactNode) => {
    return Children.toArray(children).filter(
        (child) => isValidElement(child) && child.type === Step
    );
}
