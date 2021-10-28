

import * as path from 'path';
import * as vscode from 'vscode';
import { workspace, ExtensionContext } from 'vscode';
import fileLanguage from './helpers/fileLanguage';
import message from './helpers/message';
import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('server', 'out', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	// Options to control the language client
	const clientOptions: LanguageClientOptions = {
		// Register the server for .pear files
		documentSelector: [{ scheme: 'file', language: 'alden' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'languageServerExample',
		'Language Server Example',
		serverOptions,
		clientOptions
	);
	// const HoverProvider = () => {
	// 	return {
			
	// 	};
	// };
	// const CompletionItemProvider = () => {	
	// };
	// hover and completion
	//vscode.languages.registerHoverProvider(fileLanguage, HoverProvider());
	const tokenTypes = ['variable', 'function', 'get'];
	const tokenType = tokenTypes[Math.floor(Math.random() * tokenTypes.length)];
	const tokenModifiers = ['public', 'private', 'protected'];
	const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);
	
	const tokenProvider = () => {
		return {
			provideDocumentSemanticTokens(document, token) {
				const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
				tokensBuilder.push(
					new vscode.Range(new vscode.Position(1, 1), new vscode.Position(1, 5)),
					'get',
					['public']
				);
				return tokensBuilder.build();
			}
		};
	};

	vscode.languages.registerDocumentSemanticTokensProvider(fileLanguage, tokenProvider(), legend);
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
