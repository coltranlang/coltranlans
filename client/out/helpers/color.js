"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getHexColor = (color) => {
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
const setColor = (color) => {
    return {
        color: color,
        getColor: (color) => {
            return {
                hex: getHexColor(color),
                description: 'The color is used for the color of the text'
            };
        }
    };
};
exports.default = setColor;
//# sourceMappingURL=color.js.map