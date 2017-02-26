import * as path from 'path';
import * as webpack from 'webpack';
import { stringifyRequest, getOptions } from 'loader-utils';
import { ImportID } from './constants';


const entrypoint: webpack.loader.Loader = function(source: string): void { };
module.exports = entrypoint;

module.exports.pitch = function(this: webpack.loader.LoaderContext, remainingRequest: string): any | undefined {
    const cfgOptions = getOptions(this);

    if (this.cacheable) this.cacheable();

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

            module.exports = content.locals || {};
            module.exports.${ImportID} = {
                moduleID: content[0][0],
                css: ${cfgOptions.inline ? 'content[0][1]' : 'false'}
            }

            register(content[0][0], content[0][1]);
        }

        if (module.hot && typeof window !== 'undefined' && !!window.document) {
            module.hot.accept(${remainingRequestRequirePath}, load)
        }

        load();
    `;
};

// required export format. Webpack won't be expecting a default export.
module.exports = entrypoint;
