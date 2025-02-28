import { useState } from 'react';
import { Accordion } from './demo/cpp/Accordion';
import { ServiceProvider } from './demo/pp/ServiceProvider';
import { UserList } from './demo/pp/UserList';
import { PostList } from './demo/pp/PostList';

const items = [
	{
		id: '1',
		label: 'Item 1',
		content: 'This is the content of item 1',
	},
	{
		id: '2',
		label: 'Item 2',
		content: 'This is the content of item 2',
	},
	{
		id: '3',
		label: 'Item 3',
		content: 'This is the content of item 3',
	},
];

export default function App() {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	return (
		<ServiceProvider>
			<div className='container mx-auto'>
				<div className='my-4 space-y-4'>
					{items.map((item) => (
						<Accordion
							key={item.id}
							isOpen={selectedItems.includes(item.id)}
							onToggle={() =>
								setSelectedItems((prev) =>
									prev.includes(item.id)
										? prev.filter((id) => id !== item.id)
										: [...prev, item.id]
								)
							}
						>
							<Accordion.Header>{item.label}</Accordion.Header>
							<Accordion.Content>{item.content}</Accordion.Content>
						</Accordion>
					))}
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
					<UserList />
					<PostList />
				</div>
			</div>
		</ServiceProvider>
	);
}
