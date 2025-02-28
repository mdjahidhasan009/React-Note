import { useState } from 'react';

type InputFieldProps = {
	name: string;
	label?: string;
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	ref?: React.RefObject<HTMLInputElement | null>;
};

export const InputField = ({
	name,
	label,
	placeholder,
	value,
	onChange,
	ref,
}: InputFieldProps) => {
	const [internalState, setInternalState] = useState('');

	const isControlled = value !== undefined;
	const currentValue = isControlled ? value : internalState;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (isControlled) {
			onChange?.(e);
		} else {
			setInternalState(e.target.value);
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			{label && (
				<label htmlFor={name} className='text-gray-700 font-medium'>
					{label}
				</label>
			)}
			<input
				id={name}
				value={currentValue}
				onChange={handleChange}
				placeholder={placeholder}
				className='
          border border-gray-300 rounded-md p-2
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          hover:border-gray-400
          transition-colors duration-200
        '
				ref={ref}
			/>
		</div>
	);
};

export const FormExample = () => {
	const [name, setName] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(name);
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Contact Form</h2>
			<InputField
				name='name'
				label='Name'
				placeholder='Enter your name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button type='submit'>Submit</button>
		</form>
	);
};
