import {useForm} from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";

const schema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email(),
    age: z.coerce.number().min(18).max(60),
});

type FormData = z.infer<typeof schema>;

export const BasicForm2 = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: FormData) => {
        alert(JSON.stringify(data));
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display name.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn@gmail.com" {...field} />
                                </FormControl>
                                <FormDescription>This is your public display Email.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Age</FormLabel>
                                <FormControl>
                                    <Input placeholder="20" {...field} type="number" />
                                </FormControl>
                                <FormDescription>This is your public display age.</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mt-4">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
};
