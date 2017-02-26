import updateStyles from './dom';
const registry: Map<number | string, string> = new Map<number | string, string>();

const isBrowser: boolean = typeof window !== 'undefined' && !!window.document;

export function register(moduleID: number | string, css: string): void {
    if (!registry.has(moduleID) || registry.get(moduleID) !== css) {
        registry.set(moduleID, css);
        if (isBrowser) updateStyles(moduleID, css);
    } // else: content is registered or unchanged --> noop
    console.log('isServer', !isBrowser, registry.size, process.pid);
}

export function get(): Map<number | string, string> {
    console.log('2isServer', !isBrowser, registry.size, process.pid);
    return registry;
}
