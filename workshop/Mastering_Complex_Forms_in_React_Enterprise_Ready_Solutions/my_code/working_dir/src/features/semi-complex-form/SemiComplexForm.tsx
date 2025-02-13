import {z} from "zod";
import {useFieldArray, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

const FormSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(50, { message: "Name must be at most 50 characters long" }),
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(50, { message: "Title must be at most 50 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    secondaryEmail: z.union([
        z.string().email({ message: "Invalid email address" }),
        z.string().optional(),
    ]),
    // gender: z.nativeEnum(Gender, { message: "Invalid Gender" }),
    gender: z.enum(['male', 'female', 'other'], { message: "Invalid Gender" }),
    skills: z
        .array(
            z.object({
                skill: z
                    .string()
                    .min(3, { message: "Skill must be at least 3 characters long" })
            })
        )
});

type FormValue = z.infer<typeof FormSchema>;

type FormProps = {
    initialValues?: FormValue;
}

export const SemiComplexForm = ({ initialValues } : FormProps) => {
    const form = useForm<FormValue>({
        resolver: zodResolver(FormSchema),
        defaultValues: initialValues
            ? initialValues
            : {
                name: "",
                email: "",
                secondaryEmail: "",
                gender: Gender.MALE,
                title: "",
                skills: ['skill1', 'skill2'],
            },
    });

    const skills = useFieldArray<FormValue>({
        control: form.control,
        name: "skills",
    })

    const onSubmit = (data: FormValue) => {
        console.log(data);
    }

    console.log(form.formState.errors);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your name" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your title" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='secondaryEmail'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Secondary Email</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="Enter your secondary email" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name='gender'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    // defaultValue={field.value}
                                    value={field.value}
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="male" />
                                        <Label htmlFor="male">Male</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="female" />
                                        <Label htmlFor="female">Female</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="other" />
                                        <Label htmlFor="other">Other</Label>
                                    </div>
                                </RadioGroup>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skills</FormLabel>
                                <FormControl>
                                    {field.value.map((skill, index) => (
                                        <div key={index}>{skill}</div>
                                    ))}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>



                <div className="col-span-2 flex mt-4">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    )
};
