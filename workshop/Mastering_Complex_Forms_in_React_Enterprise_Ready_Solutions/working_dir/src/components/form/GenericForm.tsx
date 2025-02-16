import {ReactNode, Ref, useImperativeHandle} from 'react'
import {
    Control,
    DefaultValues,
    FieldValues,
    FormState,
    Path,
    SubmitHandler,
    useForm,
    UseFormReturn
} from "react-hook-form";
import {z, ZodType} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form.tsx";
import { GenericFormContext } from "@/components/form/customContext.ts";

import { ArrayField} from "./ArrayField.tsx";
import { SelectField } from "./fields/SelectField.tsx";
import { TextField } from "./fields/TextField.tsx";
import { FormReset} from "./fields/FormReset.tsx";

export type TGenericFormRef<TFormValues extends FieldValues> = {
    control: Control<TFormValues>;
    form: UseFormReturn<TFormValues>;
    formState: FormState<TFormValues>;
    getValues: () => TFormValues;
    setValue: (name: Path<TFormValues>, value: TFormValues[Path<TFormValues>]) => void;////TODO: Have to research more about Path type and TFormValues type
    reset: (values?: Partial<TFormValues> | undefined) => void;
};

export type TGenericFormProps<TSchema extends ZodType> = {
    schema: TSchema;
    initialValues:  Partial<z.infer<TSchema>>;
    onSubmit: SubmitHandler<z.infer<TSchema>>;
    mode?: 'onChange' | 'onBlur' | 'onSubmit';
    children: ReactNode;
    ref?: Ref<TGenericFormRef<z.infer<TSchema>>>;
}

export const GenericForm = <TSchema extends ZodType>(props : TGenericFormProps<TSchema>) => {
    const { schema, initialValues, onSubmit, mode = 'onChange', children, ref } = props;

    type FormValues = z.infer<TSchema>;

    const form = useForm<FormValues>({
        mode,
        resolver: zodResolver(schema),
        defaultValues: initialValues as DefaultValues<FormValues>
    });

    useImperativeHandle(ref, () => ({
        control: form.control,
        form,
        formState: form.formState,
        getValues: form.getValues,
        setValue: (name: Path<FormValues>, value: FormValues[Path<FormValues>]) => {
            form.setValue(name, value)
        },
        reset: (values?: Partial<FormValues> | undefined) => {
            form.reset(values as FormValues);
        }
    }));

    return (
        <GenericFormContext.Provider value={{ control: form.control }}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </Form>
        </GenericFormContext.Provider>
    )
}

GenericForm.displayName = 'GenericForm';

GenericForm.Array = ArrayField;
GenericForm.Select = SelectField;
GenericForm.Text = TextField;
GenericForm.Reset = FormReset;