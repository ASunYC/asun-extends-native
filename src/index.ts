import './linq-array';
import './super-date';
import './super-object';
import './global';

export type Overwrite<T, U> = T extends unknown ? Pick<T, Exclude<keyof T, keyof U>> & U : never;
export type PickUnion<T, U extends keyof T> = T extends unknown ? Pick<T, U> : never;
export type OmitUnion<T, U extends keyof T> = T extends unknown ? Omit<T, U> : never;
export type PartialUnion<T> = T extends unknown ? Partial<T> : never;

//应对IE9以下没有console
if (typeof window != 'undefined' && !window.console) {
    (window as any).console = {};
    console.log = console.debug = console.info = console.warn = console.error = console.time = console.timeEnd = function () { }
}

//应对某些浏览器没有console.debug的情况
if (!console.debug) {
    console.debug = console.log;
}