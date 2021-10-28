import * as vs from 'vscode';


const getHexColor = (color: string) => {
	switch (color) {
		case 'red':
			return '#ff0000';
		case 'green':
			return '#00ff00';
		case 'blue':
			return '#0000ff';
		case 'yellow':
			return '#ffff00';
		case 'magenta':
			return '#ff00ff';
		case 'cyan':
			return '#00ffff';
		case 'black':
			return '#000000';
		case 'white':
			return '#ffffff';
		default:
			return '#ffffff';
	}
};
const setColor = (color: string) => {
	return {
		color: color,
		getColor: (color: string) => {
			return {
				hex: getHexColor(color),
				description: 'The color is used for the color of the text'
			};
		}
	};
};
export default setColor;