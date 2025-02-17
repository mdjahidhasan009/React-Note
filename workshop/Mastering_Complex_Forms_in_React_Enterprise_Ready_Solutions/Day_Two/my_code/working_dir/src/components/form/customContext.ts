import {createContext, useContext} from "react";
import {Control, FieldValues} from "react-hook-form";

//All user will not use type typescript's type properly so we also use `any` type
//We're only loosing type safety for those people who don't use typescript properly,
//other people who use typescript properly will get type safety
export type TGenericFormContext<TFormValues extends FieldValues = any> = {
    control: Control<TFormValues>,
}

export const GenericFormContext = createContext<TGenericFormContext | null>(null)

//All user will not use type typescript's type properly so we also use `any` type
//We're only loosing type safety for those people who don't use typescript properly,
//other people who use typescript properly will get type safety
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useGenericFormContext = <TFormValues extends FieldValues = any>() => {
    const context = useContext(GenericFormContext);
    if (!context) {
        throw new Error('useGenericFormContext must be used within a GenericFormContext.Provider')
    }

    return context.control as Control<TFormValues>;
}
