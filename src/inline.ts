import { get } from './registry';
import { generateStartTag, generateEndTag } from './constants';

export default function generateStyleSheet(): string {
    let result = '';
    const registry = get();
    registry.forEach((css, moduleID): void => {
        result = result + generateStartTag(moduleID) + css + generateEndTag(moduleID);
    });
    console.log(result, registry, registry.size);
    return result;
}
