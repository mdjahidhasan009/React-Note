import {z} from "zod";

import {GenericForm} from "@/components/form/GenericForm.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Trash} from "lucide-react";

const FormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    age: z.coerce.number().min(18, { message: "You must be at least 18 years old" }),
    skills: z.array(z.string()),
    links: z.array(
        z.object({
            label: z.string().min(1),
            url: z.string().url(),
        })
    ),
    gender: z.enum(['male', 'female', 'others'])
});

const genderOptions = [
    { value: "male", text: "Male" },
    { value: "female", text: "Female" },
    { value: "others", text: "Others" },
]

type FormType = z.infer<typeof FormSchema>;

const initialValues: FormType = {
    name: '',
    email: '',
    age: 0,
    skills: ['test1', 'test2' ],
    links: [
        { label: 'Google', url: 'https://google.com' },
        { label: 'Facebook', url: 'https://facebook.com' },
    ],
    gender: 'male'
}

export const Playground = () => {
    return (
        <div>
            <GenericForm
                initialValues={initialValues}
                schema={FormSchema}
                onSubmit={(data) => {
                    alert('Form submitted');
                    console.log(data);
                }}
            >
                <div className="space-y-4">
                    <GenericForm.Text<FormType> name="name" label="Name" />
                    <GenericForm.Text<FormType> name="email" label="Email" type="email" />
                    <GenericForm.Text<FormType> name="age" label="Age" type="number" />
                    <GenericForm.Select
                        name='gender'
                        options={genderOptions}
                        label='Gender'
                    />

                    <div>
                        <label>Skills</label>
                        <SkillFields />
                    </div>
                    <div>
                        <label>Links</label>
                        <LinkFields />
                    </div>

                    <div className="flex justify-end">
                        <GenericForm.Reset<FormType>
                            label="Reset"
                            // resetValues={{ name: 'Reset Name' }}
                        />
                        <Button type="submit">Submit</Button>
                    </div>
                </div>
            </GenericForm>
        </div>
    )
}


const SkillFields = () => {
    return (
        <GenericForm.Array name="skills">
            {({ fields, append, remove }) => (
                <div>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <GenericForm.Text<FormType> name={`skills.${index}`}/>
                            <Button type="button" onClick={() => remove(index)}>X</Button>
                        </div>
                    ))}
                    <Button type="button" onClick={() => append('')}>Add Skill</Button>
                </div>
            )}
        </GenericForm.Array>
    )
}


const LinkFields = () => {
    return (
        <GenericForm.Array<FormType> name="links">
            {({ fields, append, remove }) => (
                <div className="flex flex-col gap-2">
                    {fields.length === 0 && (
                        <p className="text-sm text-gray-500">No links added</p>
                    )}

                    {fields.map((field, index) => (
                        <div key={field.id} className="flex gap-2">
                            <GenericForm.Text<FormType> name={`links.${index}.label`} placeholder="Site Name " />
                            <GenericForm.Text<FormType> name={`links.${index}.url`} placeholder="Site URL" />
                            <Button
                                variant='destructive'
                                size='icon'
                                type="button"
                                onClick={() => remove(index)}
                            >
                                <Trash />
                            </Button>
                        </div>
                    ))}

                    <div>
                        <Button type="button" onClick={() => append({ label: '', url: '' })}>Add Link</Button>
                    </div>
                </div>
            )}
        </GenericForm.Array>
    )
}