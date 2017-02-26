import { ImportID } from './constants';
import { register } from './registry';


export default function prepExports({
    exports, inline, moduleID, remainingRequest
} : {
    exports: { [key: string]: any }, inline: boolean, moduleID: number | string, remainingRequest: string
}) {
    let content = require(remainingRequest);

    if (typeof content === 'string') {
        content = [[module.id, content, '']];
    }

    let css: string = '';
    if (inline) {
        for(let i: number = 0; i < content.length; i++) {
            css += content[i][1];
        }
    }
    // clean exports
    for(let propName in exports) {
        delete exports[propName];
    }
    if (content.locals) {
        for(let style in content.locals) {
            exports[style] = content.locals[style];
        }
    }
    exports[ImportID] = {
        moduleID,
        css: inline ? css : false
   }

   register(content.locals || {}, css);
}