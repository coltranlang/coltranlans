import * as vscode from 'vscode';
const extensionProvider = vscode;
const client = (text: string) => {
	return {
		message: () => {
			return new extensionProvider.Hover(text);
		}
		
	};
};
const message = (text: string) => {
	return client(text).message();
};

export default message;