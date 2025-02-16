import {useGenericFormContext} from "@/components/form/customContext.ts";
import {FieldValues, Path} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

export type TTExtFieldProps<T extends FieldValues> = {
    name: Path<T>; ////TODO: Have to research more about Path type and T type
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'number' | 'url';
}

export const TextField = <T extends FieldValues>({ name, label, placeholder, type }: TTExtFieldProps<T>) => {
    const control = useGenericFormContext<T>();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input placeholder={placeholder} type={type} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        >

        </FormField>
    )
}