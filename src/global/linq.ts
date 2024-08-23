export { };

import linq from "linq"

declare global {

  interface Array<T> {
    select<T1>(func: (t: T) => T1): linq.IEnumerable<T1>;
    where(func: (t: T) => boolean): linq.IEnumerable<T>;

    any(func: (t: T) => boolean): boolean;
    sum(func: (t: T) => number): number;
    toLinq(): linq.IEnumerable<T>;

    /**修正了null 元素的排序 */
    orderBy<T1>(func: (t: T) => T1): T[];

    /**修正了null 元素的排序 */
    orderByDescending<T1>(func: (t: T) => T1): T[];
  }

}

Array.prototype.select = function <T, T1>(func: (t: T) => T1): linq.IEnumerable<T1> {
  // console.log("ss");
  var array = this as T[];

  var query = linq.from(array).select(func);
  return query;
}

Array.prototype.where = function <T>(func: (t: T) => boolean): linq.IEnumerable<T> {
  // console.log("ss");
  var array = this as T[];

  var query = linq.from(array).where(func);
  return query;
}


Array.prototype.any = function <T>(func: (t: T) => boolean): boolean {
  // console.log("ss");
  var array = this as T[];

  var query = linq.from(array).any(func);
  return query;
}


Array.prototype.sum = function <T>(func: (t: T) => number): number {
  // console.log("ss");
  var array = this as T[];

  var query = linq.from(array).sum(func);
  return query;
}

Array.prototype.toLinq = function <T>(): linq.IEnumerable<T> {
  // console.log("ss");
  var array = this as T[];

  var query = linq.from(array);
  return query;
}

Array.prototype.orderBy = function <T, T1>(func: (t: T) => T1): T[] {
  // console.log("ss");
  var array = this as T[];

  var query = array.sort((v1, v2) => {
    var t1 = func(v1);
    var t2 = func(v2);

    if (t1 == null)
      return -1;
    if (t2 == null)
      return 1;

    if (t1 == t2)
      return 0;
    else if (t1 > t2)
      return 1;
    else
      return -1;

  })
  return query;
}

Array.prototype.orderByDescending = function <T, T1>(func: (t: T) => T1): T[] {
  // console.log("ss");
  var array = this as T[];

  var query = array.sort((v1, v2) => {
    var t1 = func(v1);
    var t2 = func(v2);

    if (t2 == null)
      return -1;
    if (t1 == null)
      return 1;

    if (t2 == t1)
      return 0;
    else if (t2 > t1)
      return 1;
    else
      return -1;

  })
  return query;
}
