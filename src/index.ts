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
    const prepExportsRequirePath: string = stringifyRequest(this, `!${path.join(__dirname, './prepExports')}`);
    return `
        var prepExports = require(${prepExportsRequirePath}).default;
        var args = {
            exports: module.exports,
            inline: ${!!cfgOptions.inline},
            moduleID: module.id,
            remainingRequest: '${remainingRequestRequirePath}'
        };

        if (module.hot && typeof window !== 'undefined' && !!window.document) {
            module.hot.accept(${remainingRequestRequirePath}, function() {
                prepExports(args);
            });
        }

        prepExports(args);
    `;
};

// required export format. Webpack won't be expecting a default export.
module.exports = entrypoint;
