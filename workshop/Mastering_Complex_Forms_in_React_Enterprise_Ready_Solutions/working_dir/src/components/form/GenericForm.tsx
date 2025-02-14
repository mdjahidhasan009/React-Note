import { ReactNode } from 'react'
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form.tsx";
import { GenericFormContext } from "@/components/form/customContext.ts";


export type GenericFormProps<T > = {
    children: ReactNode;
    initialValues: any;
    schema: any;
}

export const GenericForm = ({ children } : GenericFormProps) => {
    const form = useForm();

    const onSubmit = (values: any) => {
        console.log(values);
    }

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
