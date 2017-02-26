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

            var css = '';
            for(var i = 0; i < content.length; i++)
                css += content[i][1];

            module.exports = content.locals || {};
            module.exports.${ImportID} = {
                moduleID: content[0][0],
                css: ${cfgOptions.inline ? 'css' : 'false'}
            }

            register(content[0][0], css);
        }

        if (module.hot && typeof window !== 'undefined' && !!window.document) {
            module.hot.accept(${remainingRequestRequirePath}, load)
        }

        load();
    `;
};

// required export format. Webpack won't be expecting a default export.
module.exports = entrypoint;
