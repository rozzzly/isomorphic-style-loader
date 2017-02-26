import { generateStartTag, generateEndTag, InlineID } from './constants';

export default function updateStyles(moduleID: number | string, css: string): void {
    const $style = document.getElementById(InlineID);
    if ($style) {
        const oldText = $style.innerHTML;
        const startTag = generateStartTag(moduleID);
        const endTag = generateEndTag(moduleID);
        const newText = startTag + css + endTag;
        // find old content in tag
        const startPos = oldText.indexOf(startTag);
        const endPos = oldText.indexOf(endTag, startPos);
        if (startPos !== -1 && endPos !== -1) {
            // extract non-stale text
            const leadingText = oldText.substring(0, startPos);
            const trailingText = oldText.substring(endPos + endTag.length);
            $style.innerHTML = leadingText + newText + trailingText;
        } else {
            // just append
            $style.innerHTML = oldText + newText;
        }
    } else {
        console.error(`Could not find style tag with the id '#${InlineID}'`);
    }
}
