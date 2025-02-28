import DragAndDrop from './examples/lecture_1/EX8_RP4';
import { useState } from 'react';

export default function App() {
	const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
	const [draggedItem, setDraggedItem] = useState<string | null>(null);

	const dropZoneConfig = {
		highlightOnHover: true,
		maxItems: 3, // Allow up to 3 items to be dropped
	};

	return (
		<div className='container mx-auto'>
			<DragAndDrop
				items={items}
				dropZoneConfig={dropZoneConfig}
				render={({ items, dropZoneActive, onDragStart, onDrop }) => (
					<div style={{ display: 'flex', justifyContent: 'space-around' }}>
						<div
							style={{
								width: '45%',
								padding: '20px',
								border: '2px dashed #ccc',
							}}
						>
							<h3>Draggable Items</h3>
							{items.map((item) => (
								<div
									key={item}
									draggable
									onDragStart={(e) => {
										onDragStart(e, item);
										setDraggedItem(item);
									}}
									style={{
										padding: '10px',
										marginBottom: '10px',
										backgroundColor: '#f9f9f9',
										border: '1px solid #ddd',
										cursor: 'move',
									}}
								>
									{item}
								</div>
							))}
						</div>

						<div
							onDrop={(e) => {
								onDrop(e);
								setDraggedItem(null);
							}}
							onDragOver={(e) => e.preventDefault()}
							style={{
								width: '45%',
								padding: '20px',
								border: `2px solid ${dropZoneActive ? '#4CAF50' : '#ccc'}`,
								backgroundColor: dropZoneActive ? '#eaf8e3' : '#f9f9f9',
								transition:
									'background-color 0.3s ease, border-color 0.3s ease',
							}}
						>
							<h3>Drop Zone</h3>
							<p>{dropZoneActive ? 'Release to drop' : 'Drag items here'}</p>
							<div>
								{dropZoneActive && <p>Item being dragged: {draggedItem}</p>}
							</div>
						</div>
					</div>
				)}
			/>
		</div>
	);
}
