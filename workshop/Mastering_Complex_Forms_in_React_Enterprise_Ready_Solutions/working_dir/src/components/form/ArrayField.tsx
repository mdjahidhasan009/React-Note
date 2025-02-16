import {ArrayPath, FieldValues, useFieldArray, UseFieldArrayReturn} from "react-hook-form";
import { ReactNode } from "react";
import {useGenericFormContext} from "@/components/form/customContext.ts";

export type TArrayFieldProps<TFormValues extends FieldValues> = {
    children: (field: UseFieldArrayReturn<TFormValues, ArrayPath<TFormValues>>) => ReactNode;
    name: ArrayPath<TFormValues>;
}

export const ArrayField = <TFormValues extends FieldValues>({ children, name }: TArrayFieldProps<TFormValues>) => {
    const control = useGenericFormContext();
    const fieldArray = useFieldArray({ control, name });

    return children(fieldArray);
}