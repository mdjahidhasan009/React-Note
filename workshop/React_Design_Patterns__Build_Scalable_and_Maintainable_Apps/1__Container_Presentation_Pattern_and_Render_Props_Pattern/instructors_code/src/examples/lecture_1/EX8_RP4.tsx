import { JSX, useState } from 'react';

type DragAndDropProps = {
	items: string[];
	dropZoneConfig: {
		highlightOnHover?: boolean;
		maxItems?: number; // Limit the number of items that can be dropped
	};
	render: (params: {
		items: string[];
		dropZoneActive: boolean;
		onDragStart: (e: React.DragEvent, item: string) => void;
		onDrop: (e: React.DragEvent) => void;
	}) => JSX.Element;
};

const DragAndDrop: React.FC<DragAndDropProps> = ({
	items,
	dropZoneConfig,
	render,
}) => {
	const [draggedItem, setDraggedItem] = useState<string | null>(null);
	const [droppedItems, setDroppedItems] = useState<string[]>([]);

	const handleDragStart = (_e: React.DragEvent, item: string) => {
		setDraggedItem(item);
	};

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault();
		if (
			draggedItem &&
			!droppedItems.includes(draggedItem) &&
			droppedItems.length < dropZoneConfig.maxItems!
		) {
			setDroppedItems((prev) => [...prev, draggedItem]);
			setDraggedItem(null);
		}
	};

	const dropZoneActive = draggedItem !== null;

	return render({
		items,
		dropZoneActive,
		onDragStart: handleDragStart,
		onDrop: handleDrop,
	});
};

export default DragAndDrop;
