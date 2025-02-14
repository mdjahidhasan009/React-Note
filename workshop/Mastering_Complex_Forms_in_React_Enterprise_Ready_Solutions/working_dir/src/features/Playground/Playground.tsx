import {GenericForm} from "@/components/form/GenericForm.tsx";
import {Input} from "@/components/ui/input.tsx";
import {z} from "zod";

const FormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.number().min(18, { message: "You must be at least 18 years old" })
});

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
    name: '',
    email: '',
    age: 0
}

export const Playground = () => {
    return (
        <GenericForm initialValues={initialValues} schema={FormSchema}>
            <div>
                <h1>Playground</h1>
                <Input />
                <button type="submit">Submit</button>
            </div>
        </GenericForm>
    )
}
