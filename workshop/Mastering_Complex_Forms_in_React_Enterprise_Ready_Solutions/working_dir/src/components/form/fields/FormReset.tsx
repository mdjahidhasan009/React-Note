import {FieldValues, useFormContext} from "react-hook-form";
import {Button, ButtonProps} from "@/components/ui/button.tsx";

type TResetFormProps<T extends FieldValues> = ButtonProps & {
    label?: string;
    resetValues?: Partial<T>;
}

export const FormReset = <T extends FieldValues>({
    label,
    resetValues,
    disabled,
    ...props
}: TResetFormProps<T>) => {
    const { reset } = useFormContext<T>();

    const handleReset = () => {
        if(resetValues) {
            reset(resetValues as T);
        } else {
            reset();
        }
    }

    return (
        <Button
            type="reset"
            variant="outline"
            {...props}
            disabled={disabled}
            onClick={handleReset}
            >
            {label}
        </Button>
    )
}