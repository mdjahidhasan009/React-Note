import { JSX } from 'react';

type Props = {
	items: string[];
	render?: (item: string, index: number, total: number) => JSX.Element;
};

export const ListRenderer = ({ items, render }: Props) => {
	if (!render && items.length === 0) {
		return <p>No items to display</p>;
	}

	if (!render) {
		return (
			<ul className='list-disc list-inside'>
				{items.map((item) => (
					<li key={item} className='text-blue-500'>
						{item}
					</li>
				))}
			</ul>
		);
	}

	return (
		<ul>
			{items.map((item, index) => (
				<li key={item}>{render(item, index, items.length)}</li>
			))}
		</ul>
	);
};
