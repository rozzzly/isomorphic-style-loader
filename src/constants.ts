export const generateStartTag = (moduleID: number | string): string => `/** --<< ISOPROPYL::(${moduleID}) >>-- **/\n`;
export const generateEndTag = (moduleID: number | string): string => `\n/** >>-- ISOPROPYL::(${moduleID}) --<< **/`;
export const InlineID: string = 'ISOPROPYL_INLINE_STYLES';
export const ImportID: string = '_$$_ISOPROPYL_$$_';
