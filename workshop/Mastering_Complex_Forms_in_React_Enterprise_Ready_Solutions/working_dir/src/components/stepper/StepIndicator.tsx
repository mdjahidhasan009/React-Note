import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';


type TStepIndicatorProps = {
    step: number;
    isActive: boolean;
    isCompleted: boolean;
}

export const StepIndicator = ({
    step,
    isActive,
    isCompleted
}: TStepIndicatorProps) => {
    const baseClassName = 'w-8 h-8 rounded-full flex items-center justify-center border-2 shrink-0';

    if(isCompleted) {
        return (
            <div className={cn(baseClassName, 'bg-green-500 border-green-500 text-white')}>
                <Check className="w-4 h-4" aria-label="Completed" />
            </div>
        )
    }

    if(isActive) {
        return (
            <div className={cn(baseClassName, 'border-primary text-primary')}>
                <span>{step}</span>
            </div>
        )
    }

    return (
        <div className={cn(baseClassName, "border-muted text-muted-foreground")}>
            <span>{step}</span>
        </div>
    )
}

StepIndicator.displayName = 'StepIndicator';

export const StepConnector = ({ isCompleted } : { isCompleted: boolean }) => (
    <div
        className={cn('h-0.5 w-full', isCompleted ? 'bg-green-500' : 'bg-muted')}
        role="separator"
    />
);