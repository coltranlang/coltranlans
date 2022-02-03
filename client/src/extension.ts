/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

import * as path from 'path';
import * as fs from 'fs';
import { workspace, ExtensionContext } from 'vscode';
import vscode = require('vscode');

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
	DiagnosticRelatedInformation
} from 'vscode-languageclient/node';

let client: LanguageClient;

import Language from './language';
import setHover from './hover';

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
		// Register the server for Alden documents
		documentSelector: [{ scheme: 'file', language: 'alden' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new LanguageClient(
		'aldenLanguageServer',
		'Alden Language Server',
		serverOptions,
		clientOptions
	);

	// // Hover
	// vscode.languages.registerHoverProvider('alden', {
	// 	provideHover(document, position, token) {
	// 		const getPosition = document.getText(document.getWordRangeAtPosition(position));
	// 		const commentIndex = getPosition.indexOf('#');
	// 		const name = commentIndex > -1 ? getPosition.substring(0, commentIndex) : getPosition;
	// 		const module = Language.getModule(name);
	// 		const builtIn = Language.getBuiltIn(name);
	// 		if (module) {
	// 			return setHover(module);
	// 		}
	// 		if (builtIn) {
	// 			return setHover(builtIn);
	// 		}
	// 		// show information about the hovered word e.g class Test
	// 		// def test():
	// 		//     return "test"
	// 		// when a user hovers over the word method in the above example the hover shows the return type of the method
	// 		// if the word is not a method then the hover shows the type of the variable
	// 		const tokens = document.getText().split('\n');
	// 		const line = tokens[position.line];
	// 		const lineIndex = line.indexOf(name);
	// 		const lineStart = line.substring(0, lineIndex);
	// 		const lineEnd = line.substring(lineIndex + name.length);
	// 		return null;
	// 	}
	// });
	const getSymbolKind = (kind) => {
		let symbolKind: vscode.SymbolKind;
		switch (kind) {
			case 'class':
				symbolKind = vscode.SymbolKind.Class;
				break;
			case 'def':
				symbolKind = vscode.SymbolKind.Function;
				break;
			case 'variable':
				symbolKind = vscode.SymbolKind.Variable;
				break;
			case 'constant':
				symbolKind = vscode.SymbolKind.Constant;
				break;
			default:
				symbolKind = vscode.SymbolKind.Class;
		}
		return symbolKind;
	};
	const getComplentionKind = (kind) => {
		let completionKind: vscode.CompletionItemKind;
		switch (kind) {
			case 'class':
				completionKind = vscode.CompletionItemKind.Class;
				break;
			case 'def':
				completionKind = vscode.CompletionItemKind.Function;
				break;
			case 'variable':
				completionKind = vscode.CompletionItemKind.Variable;
				break;
			case 'constant':
				completionKind = vscode.CompletionItemKind.Constant;
				break;
			default:
				completionKind = vscode.CompletionItemKind.Class;
		}
		return completionKind;
	};
	// Symbol
	vscode.languages.registerDocumentSymbolProvider('alden', {
		provideDocumentSymbols(document, token) {
			const symbols: vscode.DocumentSymbol[] = [];
			const modules = Language.getModules();
			const line = document.lineAt(0);
			const start = line.range.start;
			const end = line.range.end;
			for (const module of modules) {
				const symbol = new vscode.DocumentSymbol(
					module.name,
					module.description,
					getSymbolKind(module.symbolKind),
					new vscode.Range(
						new vscode.Position(start.line, start.character),
						new vscode.Position(end.line, end.character)
					),
					new vscode.Range(
						new vscode.Position(start.line, start.character),
						new vscode.Position(end.line, end.character)
					)
				);
				symbols.push(symbol);
			}
			return symbols;
		}
	});
	// Go to definition
	vscode.languages.registerDefinitionProvider('alden', {
		provideDefinition(document, position, token) {
			const getPosition = document.getText(document.getWordRangeAtPosition(position));
			const commentIndex = getPosition.indexOf('#');
			const name = commentIndex > -1 ? getPosition.substring(0, commentIndex) : getPosition;
			const module = Language.getModule(name);
			const line = document.lineAt(0);
			const start = line.range.start;
			const end = line.range.end;
			// This is for testing purposes only
			const file = vscode.Uri.file(`${process.env.USERPROFILE}\\.vscode\\extensions\\alden.alden-${vscode.extensions.getExtension('alden.alden').packageJSON.version}\\client\\src\\stubs\\${module.name}.aldeni`);
			// check if file exists without using fs.existsSync
			if (fs.existsSync(file.fsPath)) {
				if (module) {
					return [
						new vscode.Location(
							file,
							new vscode.Range(
								new vscode.Position(start.line, start.character),
								new vscode.Position(end.line, end.character)
							)
						)
					];
				}
			}
			return null;
		}
	});
	// Code completion
	vscode.languages.registerCompletionItemProvider('alden', {
		provideCompletionItems(document, position, token) {
			const getPosition = document.getText(document.getWordRangeAtPosition(position));
			const commentIndex = getPosition.indexOf('#');
			const name = commentIndex > -1 ? getPosition.substring(0, commentIndex) : getPosition;
			const module = Language.getModule(name);
			const builtIn = Language.getBuiltIn(name);
			if (module) {
				const symbolKind = getComplentionKind(module.symbolKind);
				const completionItem = new vscode.CompletionItem(module.name, symbolKind);
				completionItem.documentation = module.description;
				return [completionItem];
			}
			if (builtIn) {
				const symbolKind = getComplentionKind(builtIn.symbolKind);
				const completionItem = new vscode.CompletionItem(builtIn.name, symbolKind);
				completionItem.documentation = builtIn.description;
				return [completionItem];
			}
			return null;
		}
	});
	
	// Diagnostic
	// vscode.workspace.onDidChangeTextDocument((e) => {
	// 	if (e.document.languageId === 'alden') {
	// 		const tokens = e.document.getText();
	// 		//
	// 	}
	// });
	// Start the client. This will also launch the server
	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}