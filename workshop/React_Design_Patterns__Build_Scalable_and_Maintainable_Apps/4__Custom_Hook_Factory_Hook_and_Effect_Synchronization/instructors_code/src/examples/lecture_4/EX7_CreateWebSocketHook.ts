import { useEffect, useState } from 'react';

export const createWebSocketHook = <T>(url: string, eventName: string) => {
	return () => {
		const [data, setData] = useState<T | null>(null);

		useEffect(() => {
			const ws = new WebSocket(url);

			ws.onopen = () => {
				ws.send(JSON.stringify({ subscribe: eventName }));
			};

			ws.onmessage = (event) => setData(JSON.parse(event.data));

			return () => ws.close();
		}, [eventName]);

		return data;
	};
};

type Message = {
	id: number;
	content: string;
	timestamp: string;
};

export const useChatMessages = createWebSocketHook<Message>(
	'wss://example.com/ws',
	'chatMessages'
);

type Notification = {
	id: number;
	message: string;
	timestamp: string;
};

export const useNotifications = createWebSocketHook<Notification>(
	'wss://example.com/ws',
	'notifications'
);

type StockPrice = {
	id: number;
	symbol: string;
	price: number;
	timestamp: string;
};

export const useStockPrices = createWebSocketHook<StockPrice>(
	'wss://example.com/ws',
	'stockPrices'
);
