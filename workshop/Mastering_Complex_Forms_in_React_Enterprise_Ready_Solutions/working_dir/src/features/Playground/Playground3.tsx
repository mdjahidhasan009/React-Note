import {z} from "zod";
import {useRef} from "react";
import {GenericForm, TGenericFormRef} from "@/components/form";
import {TextField} from "@/components/form/fields/TextField.tsx";
import {Card} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {RadioGroupField} from "@/components/form/fields/RadioGroupField.tsx";

const FormSchema = z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    gender: z.enum(['Male', 'Female', 'Others'], {
        errorMap: () => ({ message: 'Gender is required' })
    }),
});

type TFormValues = z.infer<typeof FormSchema>;

const initialValues: TFormValues = {
    name: '',
    gender: 'Male'
};

const genderOptions = [
    { value: 'Male', text: 'Male' },
    { value: 'Female', text: 'Female' },
    { value: 'Others', text: 'Others' }
]

export const Playground3 = () => {
    const formRef = useRef<TGenericFormRef<TFormValues>>(null);

    return (
        <Card className="bg-zinc-100 p-4 my-4 max-w-xl mx-auto">
            <GenericForm
                ref={formRef}
                schema={FormSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                    alert(JSON.stringify(values));
                }}
            >
                <div className="space-y-4">
                    <TextField<TFormValues> name="name" label="Name" placeholder="Enter your name" required />
                    <RadioGroupField<TFormValues> name="gender" options={genderOptions} />

                    <Button type="submit">Submit</Button>
                </div>
            </GenericForm>
        </Card>
    )
}