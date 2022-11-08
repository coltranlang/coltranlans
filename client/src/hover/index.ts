import {Hover, MarkdownString } from 'vscode';
const setHover = ({ name, description, detail, symbolKind }: { name: string, description: string, detail: string, symbolKind: string }) => {
	const markdown = new MarkdownString();
	const code: any = detail;
	markdown.appendMarkdown(`(${symbolKind})`);
	markdown.appendCodeblock(code, 'coltran');
	markdown.appendMarkdown("---\n");
	markdown.appendText(description);
	markdown.isTrusted = true;
	const hover = new Hover(markdown);
	return hover;
};

export default setHover;