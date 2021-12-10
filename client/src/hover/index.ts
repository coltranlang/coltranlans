import {Hover, MarkdownString } from 'vscode';
const setHover = ({ name, description, detail }: { name: string, description: string, detail: string }) => {
	const markdown = new MarkdownString();
	const code = detail;
	markdown.appendCodeblock(code, 'alden');
	markdown.appendMarkdown("---\n");
	markdown.appendText(description);
	markdown.isTrusted = true;
	const hover = new Hover(markdown);
	return hover;
};

export default setHover;