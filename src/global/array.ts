export { };

declare global {
    interface Array<T> {
        remove(t: T): T[];
        removeBy(func: (t: T) => boolean): T[];
        swap(t: T, t1: T): T[];
        insert(t: T, index: number): T[];
        insertTo(newt: T, prior: T): T[];
        add(t: T, index: number): T[];
        addTo(newt: T, prior: T): T[];
        prior(t: T): T | null;
        /** 名字不能是next，会和一些枚举库重合 */
        nextTo(t: T): T | null;
        closedNext(t: T): T;
        closedPrior(t: T): T;
        SamePosValue<T1>(array1: T1[], t: T): T1 | null;

        firstOrDefault(func?: (t: T) => boolean): T | null;
        last(): T | null;

        toMap<Key, Value>(getkey: (t: T) => Key, getvalue: (t: T) => Value): Map<Key, Value>;
    }
}

Array.prototype.firstOrDefault = function <T>(func?: (t: T) => boolean): T | null {
    // console.log("ss");

    var array = this as T[];

    if (array.length == 0)
        return null;
    if (func == null)
        return array[0];

    var find = array.find(v => func(v));

    return find!;
}

Array.prototype.last = function <T>(): T | null {
    // console.log("ss");

    var array = this as T[];

    if (array.length == 0)
        return null;


    return array[array.length - 1];
}

Array.prototype.remove = function <T>(t: T): T[] {
    // console.log("ss");
    var array = this as T[];
    if (t == null)
        return array;
    else
        return array.filter(v => v != t);
}

Array.prototype.removeBy = function <T>(func: (t: T) => boolean): T[] {
    // console.log("ss");
    var array = this as T[];

    return array.filter(v => !func(v));
}

Array.prototype.swap = function <T>(t: T, t1: T): T[] {
    // console.log("ss");
    var array = this as T[];

    if (t == null || t1 == null || t == t1)
        return array;

    var find1 = array.findIndex(v => v == t);
    var find2 = array.findIndex(v => v == t1);

    if (find1 == -1 || find2 == -1) {
        return array;
    }

    var minIndex = Math.min(find1, find2);
    var maxIndex = Math.max(find1, find2);

    var before_sp1 = array.slice(0, minIndex);
    // console.log("before",before_sp1);

    var sp1_sp2 = array.slice(minIndex + 1, maxIndex);
    // console.log("sp1_sp2",sp1_sp2);
    var after_sp2 = array.slice(maxIndex + 1, array.length);
    // console.log("after_sp2",after_sp2);

    if (find1 < find2) {
        var newArray = [...before_sp1, t1, ...sp1_sp2, t, ...after_sp2];
        return newArray;
    }
    else {
        var newArray = [...before_sp1, t, ...sp1_sp2, t1, ...after_sp2];
        return newArray;
    }
}

Array.prototype.insert = function <T>(t: T, index: number): T[] {

    var array = this as T[];

    if (t == null) {
        return array;
    }

    if (index > 0 && index < array.length) {
        var arr1 = array.slice(0, index);
        // console.log("arr1",arr1);
        var arr2 = array.slice(index, array.length);
        // console.log("arr2",arr2);
        var newArr = [...arr1, t, ...arr2];

        return newArr;
    }

    else if (index == 0) {
        return [t, ...array];
    }
    else if (index == -1) {
        return [t, ...array];
    }
    else if (index == array.length) {
        return [...array, t];
        // return array;
    }
    else
        return array;

}

Array.prototype.insertTo = function <T>(newt: T, prior: T): T[] {

    var array = this as T[];

    if (newt == null) {
        return array;
    }

    //如果没有对标加到最前面
    if (prior == null) {
        return [newt, ...array];
    }

    var index = array.findIndex(v => v == prior);

    var newArr = array.insert(newt, index);

    return newArr;
}


Array.prototype.add = function <T>(t: T, index: number): T[] {

    var array = this as T[];

    if (t == null) {
        return array;
    }

    if (index >= 0 && index < array.length - 1) {
        var arr1 = array.slice(0, index + 1);
        // console.log("arr1",arr1);
        var arr2 = array.slice(index + 1, array.length);
        // console.log("arr2",arr2);
        var newArr = [...arr1, t, ...arr2];

        return newArr;
    }

    // //当找不到目标是添加到最前面
    else if (index == -1) {
        return [...array, t];
    }
    else if (index == array.length - 1) {
        return [...array, t];
        // return array;
    }
    else
        return array;

}

Array.prototype.addTo = function <T>(newt: T, prior: T): T[] {
    var array = this as T[];

    if (newt == null) {
        return array;
    }

    //没有对标，则加到最后面
    if (prior == null) {
        return [newt, ...array];
    }

    var index = array.findIndex(v => v == prior);

    var newArr = array.add(newt, index);

    return newArr;
}

Array.prototype.prior = function <T>(t: T): T | null {

    var array = this as T[];

    if (t == null)
        return null;

    var find = array.findIndex(v => v == t);
    if (find > 0)
        return array[find - 1];
    else
        return null;
}

Array.prototype.nextTo = function <T>(t: T): T | null {
    var array = this as T[];

    if (t == null)
        return null;

    var find = array.findIndex(v => v == t);
    // console.log("find",find,array);
    if (find == -1)
        return null;
    if (find < array.length - 1)
        return array[find + 1];
    else
        return null;
}


// static closedNext<T>(array:T[],t:T):T
Array.prototype.closedNext = function <T>(t: T): T {
    var array = this as T[];

    if (array == null || array.length == 0 || t == null)
        return t;

    var theNext = array.nextTo(t);

    if (theNext != null)
        return theNext;
    else
        return array[0];
}

Array.prototype.closedPrior = function <T>(t: T): T {
    var array = this as T[];

    if (array == null || array.length == 0 || t == null)
        return t;

    var thePrior = array.prior(t);

    if (thePrior != null)
        return thePrior;
    else
        return array[array.length - 1];
}

Array.prototype.SamePosValue = function <T, T1>(array1: T1[], t: T): T1 | null {
    var array = this as T[];

    if (array == null || array.length == 0 || t == null)
        return null;

    var find = array.indexOf(t);
    if (find != -1) {
        if (find < array1.length) {
            return array1[find];
        }
    }

    return null;

}

Array.prototype.toMap = function <T, Key, Value>(
    getkey: (t: T) => Key,
    getvalue: (t: T) => Value): Map<Key, Value> {

    var array = this as T[];

    if (array == null || array.length == 0)
        return new Map<Key, Value>();

    var map = new Map<Key, Value>();
    for (const item of array) {

        var key = getkey(item);
        var value = getvalue(item);

        map.set(key, value);
    }

    return map;
}

