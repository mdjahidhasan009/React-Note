export type Logger = {
	log: (message: string) => void;
	error: (message: string) => void;
};

export const ConsoleLogger: Logger = {
	log: (message: string) => {
		console.log(message);
	},
	error: (message: string) => {
		console.error(message);
	},
};
