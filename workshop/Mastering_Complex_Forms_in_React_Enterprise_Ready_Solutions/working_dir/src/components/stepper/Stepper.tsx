import {createContext, useContext, Children, useState, ReactNode, isValidElement} from "react";

type TStepperContext = {
    currentStep: number;
    totalSteps: number;
    setCurrentStep: (step: number) => void;
}

const StepperContext = createContext<TStepperContext | null>(null);

const useStepperContext = () => {
    const context = useContext(StepperContext);

    if(!context) {
        throw new Error('useStepperContext must be used within a StepperProvider');
    }

    return context;
}

type TStepperProps = {
    children: ReactNode;
}

export const Stepper = ({ children } : TStepperProps) => {
    const [currentStep, setCurrentStep] = useState(1);
    const steps = getSteps(children);

    return (
        <StepperContext.Provider
            value={{ currentStep, setCurrentStep, totalSteps: steps.length }}
        >
            <div>Total Steps: {steps.length}</div>
            {children}
        </StepperContext.Provider>
    )
}

const Step = ({ children }: { children: ReactNode}) => {
    const { currentStep } = useStepperContext();

    return (
        <div className="border border-gray-300 p-4 rounded-md my-2">
            <p>Current Step: { currentStep }</p>
            {children}
        </div>
    )

}

Stepper.Step = Step;

//utility functions
const getSteps = (children: ReactNode) => {
    return Children.toArray(children).filter(
        (child) => isValidElement(child) && child.type === Step
    );
}