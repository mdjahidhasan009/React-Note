export type Logger = {
	log: (message: string) => void;
	error: (message: string) => void;
};

export const consoleLogger: Logger = {
	log: (message: string) => {
		console.log(message);
	},
	error: (message: string) => {
		console.error(message);
	},
};
