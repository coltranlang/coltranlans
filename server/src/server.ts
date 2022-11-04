import {
	createConnection,
	TextDocuments,
	ProposedFeatures,
	InitializeParams,
	DidChangeConfigurationNotification,
	CompletionItem,
	CompletionItemKind,
	TextDocumentSyncKind,
	InitializeResult,
	CompletionParams,
	HoverClientCapabilities,
	TextDocumentPositionParams,
	TextEdit,
	Range,
	Position,
	MarkupContent,
	MarkupKind,
	InsertTextFormat,
	Diagnostic,
	DiagnosticSeverity,
} from 'vscode-languageserver/node';

//import vscode = require('vscode');
import aldenLanguage from '../src/aldenLanguage.json';


import {
	TextDocument,
} from 'vscode-languageserver-textdocument';



// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = createConnection(ProposedFeatures.all);

// Create a simple text document manager.
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;

interface BuiltIns {
	name: string,
	documentation: string,
	detail: string,
}

interface BuiltInModules {
	name: string,
	documentation: string,
	detail: string,
	variables?: BuiltInVariables[],
	methods?: BuiltInModuleMethods[]
}


interface BuiltInVariables {
	name: string,
	documentation: string,
	detail: string,
	methods?: BuiltInModuleMethods[]
}

interface BuiltInModuleMethods {
	name: string,
	documentation: string
	detail: string,
}


const keywords: string[] = aldenLanguage.keywords;
const builtIns: BuiltIns[] = aldenLanguage.builtins;
const builtInModules: BuiltInModules[] = aldenLanguage.modules;

let knownSymbols: CompletionItem[] = [];

connection.onInitialize((params: InitializeParams) => {
	const capabilities = params.capabilities;

	// Does the client support the `workspace/configuration` request?
	// If not, we fall back using global settings.
	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);

	const result: InitializeResult = {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				triggerCharacters: ['.']
			},
		}
	};
	if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
			workspaceFolders: {
				supported: true
			}
		};
	}
	return result;
});

connection.onInitialized(() => {
	if (hasConfigurationCapability) {
		// Register for all configuration changes.
		connection.client.register(DidChangeConfigurationNotification.type, undefined);
	}
	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			connection.console.log('Workspace folder change event received.');
		});
	}
});

// The example settings
interface ExampleSettings {
	maxNumberOfProblems: number;
}

// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings: ExampleSettings = { maxNumberOfProblems: 1000 };
let globalSettings: ExampleSettings = defaultSettings;

// Cache the settings of all open documents
const documentSettings: Map<string, Thenable<ExampleSettings>> = new Map();

connection.onDidChangeConfiguration(change => {
	if (hasConfigurationCapability) {
		// Reset all cached document settings
		documentSettings.clear();
	} else {
		globalSettings = <ExampleSettings>(
			(change.settings.aldenLanguageServer || defaultSettings)
		);
	}
});

// Only keep settings for open documents
documents.onDidClose(e => {
	documentSettings.delete(e.document.uri);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
	const content = change.document.getText();
	const matches = content.matchAll(/(?<type>let|final|def|class|get|as|"")\s+(?<name>[a-zA-Z0-9_]+)\s*(?:|{)/g);
	const symbols: CompletionItem[] = [];
	const foundSymbols: Map<string, boolean> = new Map();

	for (const match of matches) {
		const symbol = match.groups;

		if (symbol && !foundSymbols.has(symbol.name)) {
			let kind;

			switch (symbol.type) {
				case 'get': {
					kind = CompletionItemKind.Module;
					break;
				}


				case 'class': {
					kind = CompletionItemKind.Class;
					break;
				}

				case 'def': {
					kind = CompletionItemKind.Function;
					break;
				}

				case 'const': {
					kind = CompletionItemKind.Constant;
					break;
				}

				default: {
					kind = CompletionItemKind.Variable;
				}
			}

			symbols.push({
				label: symbol.name,
				kind: kind,
			});

			foundSymbols.set(symbol.name, true);
		}
	}

	knownSymbols = symbols;
});


function getPreviousToken(srcline: string, end: number) {
	const re = new RegExp("[$_a-zA-Z][$_a-zA-Z0-9]*", 'g');
	let found;
	while ((found = re.exec(srcline)) != null) {
		const last = found.index + found[0].length;
		if (last == end) {
			return found[0];
		}
	}
	return "";
}

function findModuleMethods(name: string): BuiltInModuleMethods[] {
	for (const module of builtInModules) {
		if (module.name == name) {
			return module.methods || [];
		}
	}

	return [];
}

function findModulewithVariables(name: string): BuiltInVariables[] {
	for (const module of builtInModules) {
		if (module.name == name) {
			return module.variables || [];
		}
	}

	return [];
}


function aldenDocumentationMarkdown(documentation: string): MarkupContent {
	return {
		kind: MarkupKind.Markdown,
		value: [
			"```coltran",
			documentation,
			"```"
		].join('\n\n')
	};
}







// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);

// Listen on the connection
connection.listen();