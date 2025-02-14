import { cn } from '@/lib/utils.ts';
import {Path, RegisterOptions, useForm, UseFormRegister} from 'react-hook-form'
import {HTMLInputTypeAttribute} from "react";

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
                    <TextField
                        label='Name'
                        type='text'
                        name='name'
                        placeholder='Enter your name'
                        register={form.register}
                        dirty={dirtyFields.name}
                        hasError={!!errors.name}
                        errorMessage={errors.name?.message}
                        validator={{
                            required: 'Name is required',
                            minLength: { value: 3, message: 'Name should be at least 3 characters' }
                        }}
                    />

                    <TextField
                        label='Email'
                        type='email'
                        name='email'
                        placeholder='Enter your email'
                        register={form.register}
                        dirty={dirtyFields.email}
                        hasError={!!errors.email}
                        errorMessage={errors.email?.message}
                        validator={{
                            required: 'Email is required',
                            pattern: {
                                value: /^[^\s@]+]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Invalid email'
                            }
                        }}
                    />

                    <TextField
                        label='Age'
                        type='number'
                        name='age'
                        placeholder='Enter your age'
                        register={form.register}
                        dirty={dirtyFields.age}
                        hasError={!!errors.age}
                        errorMessage='Age is required'
                        validator={{
                            required: 'Age is required',
                            min: { value: 18, message: 'You should be at least 18 years old' },
                            max: { value: 60, message: 'You should be at most 60 years old' }
                        }}
                    />

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

type TextFieldProps = {
    label: string;
    type: HTMLInputTypeAttribute;
    name: Path<FormData>
    placeholder?: string;
    className?: string;
    validator: RegisterOptions<FormData>
    dirty?: boolean;
    hasError?: boolean;
    errorMessage?: string;
    register: UseFormRegister<FormData>
}

const TextField = ({
    label,
    type,
    name,
    placeholder,
    className,
    validator,
    dirty,
    hasError,
    errorMessage,
    register
}: TextFieldProps) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor="name">{ label }</label>
            <input
                type={type}
                id={name}
                placeholder={placeholder}
                className={cn(
                    "border rounded-md p-2",
                    hasError && dirty && "border-red-500 border-2",
                    className
                )}
                {...register(name, validator)}
            />
            {hasError && dirty && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
        </div>
    )
}
