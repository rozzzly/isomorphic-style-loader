import updateStyles from './dom';
import { ImportID } from './constants';
const registry: Map<number | string, string> = new Map<number | string, string>();

const isBrowser: boolean = typeof window !== 'undefined' && !!window.document;

(global as any)[ImportID] = (global as any)[ImportID] || { registry };

export function register(moduleID: number | string, css: string): void {
    if (!(global as any)[ImportID].registry.has(moduleID) || (global as any)[ImportID].registry.get(moduleID) !== css) {
        (global as any)[ImportID].registry.set(moduleID, css);
        if (isBrowser) updateStyles(moduleID, css);
    } // else: content is registered or unchanged --> noop
}

export function get(): Map<number | string, string> {
    return (global as any)[ImportID].registry;
}
