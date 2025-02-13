import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";

enum Gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}

const FormSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" })
        .max(4, { message: "Name must be at most 4 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    secondaryEmail: z
        .string()
        .email({ message: "Invalid email address" })
        .optional(),
    gender: z.nativeEnum(Gender, { message: "Invalid Gender" }),
    // gender: z.enum(['male', 'female', 'other'], { message: "Invalid Gender" }),
    title: z
        .string()
        .min(3, { message: "Title must be at least 3 characters long" })
        .max(4, { message: "Title must be at most 4 characters long" }),
    skills: z
        .array(z.string())
        .min(1, { message: "At least one skill is required" }),
});

type FormValues = z.infer<typeof FormSchema>;

type FormProps = {
    initialValues?: FormValues;
}

export const SemiComplexForm = ({ initialValues } : FormProps) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(FormSchema),
        defaultValues: initialValues
            ? initialValues
            : {
                name: "",
                email: "",
                secondaryEmail: "",
                gender: Gender.MALE,
                title: "",
                skills: [],
            },
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => console.log(data))}>
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
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
};
