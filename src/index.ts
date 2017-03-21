import * as path from 'path';
import * as webpack from 'webpack';
import { stringifyRequest, getOptions } from 'loader-utils';
import { ImportID } from './constants';


/**
 * Gets a numberical hash from a string. (Not cryptographically sound!)
 * 
 * Stolen from
 * @see https://github.com/darkskyapp/string-hash
 * 
 * @param {string} str string to hash
 * @return {number} the hashed value
 **/
function hash(str: string): number {
  let hash: number = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash >>> 0;
}


const entrypoint: webpack.loader.Loader = function(source: string): void { };
module.exports = entrypoint;

module.exports.pitch = function(this: webpack.loader.LoaderContext, remainingRequest: string): any | undefined {
    const cfgOptions = getOptions(this);

    if (this.cacheable) this.cacheable();
    
    
    const moduleHash = hash(this.resourcePath);
    
    const remainingRequestRequirePath: string = stringifyRequest(this, `!!${remainingRequest}`);
    const registryRequirePath: string = stringifyRequest(this, `!${path.join(__dirname, './registry')}`);
    return `
        var content = undefined;
        var register = require(${registryRequirePath}).register;

        function load() {
            content = require(${remainingRequestRequirePath});
            if (typeof content === 'string') {
                content = [[module.id, content, '']];
            }
            var css = '';
            for(var i = 0; i < content.length; i++) {
                css += content[i][1];
            }
            module.exports = content.locals || {};
            module.exports.${ImportID} = {
                moduleID: ${moduleHash},
                css: ${cfgOptions.inline ? 'content[0][1]' : 'false'}
            }
            register(${moduleHash}, css);
        }
        if (module.hot && typeof window !== 'undefined' && !!window.document) {
            module.hot.accept(${remainingRequestRequirePath}, load);
        }

        load();
    `;
};

// required export format. Webpack won't be expecting a default export.
module.exports = entrypoint;
