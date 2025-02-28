import { useEffect, useState } from 'react';

type CreateWebSocketOptions = {
	url?: string;
};

export const createWebSocketHook = <T>(
	eventName: string,
	options: CreateWebSocketOptions = {}
) => {
	const url = options.url || 'wss://stacklearner.com/ws';
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
	timestamp: number;
};

export const useChatMessages = createWebSocketHook<Message>('chatMessage');

type Notification = {
	id: number;
	message: string;
	timestamp: number;
};

export const useNotifications = createWebSocketHook<Notification>(
	'notification',
	{
		url: 'wss://stacklearner.com/ws',
	}
);
