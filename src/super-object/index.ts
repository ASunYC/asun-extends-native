///<reference path="index.d.ts"/>

/**
 * 将sources合并到target，该合并全部是深拷贝
 * @param target
 * @param sources
 * @returns {Object}
 */
Object.merge = function (target: any, ...sources: any[]) {
    for (let i = 0; i < sources.length; ++i) {
        let source = sources[i];

        if (typeof source != 'object' || source == null) {
            continue;
        }

        for (let skey in source) {
            //只处理自身的key 这里可能来自于外部prototype的扩展
            if (!source.hasOwnProperty(skey)) {
                continue;
            }

            if (source[skey] instanceof Date) {
                //Date类型 要克隆一份 保证深拷贝
                target[skey] = new Date(source[skey]);
                continue;
            }
            else if (typeof (target[skey]) == 'object' && target[skey] != null && typeof (source[skey]) == 'object' && source[skey] != null) {
                // 两个都是Object 递归merge之
                Object.merge(target[skey], source[skey])
            }
            else {
                if (Array.isArray(source[skey])) {
                    // 数组merge后还是数组
                    target[skey] = Object.merge([], source[skey]);
                }
                else if (typeof (source[skey]) == 'object' && source[skey] !== null) {
                    // Object要克隆一份以确保深拷贝
                    target[skey] = Object.merge({}, source[skey]);
                }
                else {
                    // 基本类型 直接赋值即可
                    target[skey] = source[skey];
                }
            }
        }
    }

    return target;
}

if (!Object.values) {
    Object.values = function (obj: any) {
        let output: any[] = [];
        for (let k in obj as any) {
            obj.hasOwnProperty(k) && output.push(obj[k]);
        }
        return output;
    }
}

if (!Object.entries) {
    Object.entries = function <T>(obj: { [s: string]: T }) {
        let output: [string, T][] = [];
        for (let key in obj) {
            if (!(obj as Object).hasOwnProperty(key)) {
                continue;
            }
            output.push([key, obj[key]]);
        }
        return output;
    }
}

Object.forEach = function <T>(obj: T, handler: (v: T[keyof T], k: keyof T & string, obj: T) => void): void {
    for (let key in obj) {
        if (!(obj as Object).hasOwnProperty(key)) {
            return;
        }
        handler(obj[key], key, obj);
    }
}