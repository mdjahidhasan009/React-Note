import {createContext, useContext} from "react";

export type TStepError = {
    hasError: boolean;
    message?: string;
}

export type TStepperContextType = {
    currentStep: number;
    setCurrentStep: (step: number) => void;
    totalSteps: number;
    stepErrors: Record<number, TStepError>;
    setStepErrors: (errors: Record<number, TStepError>) => void;
}

export const StepperContext = createContext<TStepperContextType | null>(null);

export const useStepperContext = () => {
    const context = useContext(StepperContext);

    if(!context) {
        throw new Error('useStepperContext must be used within a StepperProvider');
    }

    return context;
}
