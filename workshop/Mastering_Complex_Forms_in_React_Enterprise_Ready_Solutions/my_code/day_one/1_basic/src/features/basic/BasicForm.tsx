import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form'

type FormData = { name: string; email: string; age: number; };

export const BasicForm = () => {
    const form = useForm<FormData>({
        mode: "onChange",
    });

    const onSubmit = (data: FormData) => {
        alert(JSON.stringify(data));
    };

    const { errors, dirtyFields } = form.formState;

    return (
        <div>
            <h2 className="text-2xl font-bold">Basic Form</h2>
            <div className="mt-3 border p-4">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            className={cn(
                                "border rounded-md p-2",
                                errors.name &&
                                    dirtyFields.name &&
                                    "border-red-500 border-2"
                            )}
                            {...form.register("name", { required: true, minLength: 3 })}
                        />
                        {errors.name &&
                            dirtyFields.name &&
                            (
                                <p className="text-red-500 text-sm">
                                    Name is required
                                </p>
                            )
                        }
                    </div>


                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            className={cn(
                                "border rounded-md p-2",
                                errors.email &&
                                dirtyFields.email &&
                                "border-red-500 border-2"
                            )}
                            {...form.register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
                        />
                        {errors.email &&
                            dirtyFields.email &&
                            (
                                <p className="text-red-500 text-sm">
                                    Email is required
                                </p>
                            )
                        }
                    </div>


                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Age</label>
                        <input
                            type="number"
                            id="age"
                            placeholder="Enter your age"
                            className={cn(
                                "border rounded-md p-2",
                                errors.age &&
                                dirtyFields.age &&
                                "border-red-500 border-2"
                            )}
                            {...form.register("age", { required: true, min: 18, max: 60 })}
                        />
                        {errors.age &&
                            dirtyFields.age &&
                            (
                                <p className="text-red-500 text-sm">
                                    Age is required
                                </p>
                            )
                        }
                    </div>

                    <div className="mt-3">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
