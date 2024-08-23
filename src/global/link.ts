// import { link } from "fs";

export { };

// declare var window;
// var window= window || null;
// const _global = (window /* browser */ || global /* node */) as any;

declare var global: any;

var _global;
try {
  _global = (window /* browser */) as any;
}
catch (e) {
  _global = (global /* node */) as any;
}

export enum LinkStates {
  continue,
  stop,
}

export class LinkObject<T> {
  state: LinkStates | undefined;

  value?: T | null;

  parents: any[] = [];

  ///////////////////////////////////////////////////
  private createNext(): LinkObject<T> {
    var next = new LinkObject<T>();
    next.parents = [...this.parents];
    next.value = this.value;

    if (this.state == LinkStates.stop) {
      next.state = LinkStates.stop;
    }
    else {
      next.state = LinkStates.continue;
    }

    return next;
  }

  private createOtherNext<T1>(): LinkObject<T1> {
    var next = new LinkObject<T1>();
    next.parents = [...this.parents];
    next.value = null;

    if (this.state == LinkStates.stop) {
      next.state = LinkStates.stop;
    }
    else {
      next.state = LinkStates.continue;
    }

    return next;
  }

  //////////////////////////////////////////////////

  $not_null(): LinkObject<T> {

    var next = this.createNext();
    if (this.state == LinkStates.stop || this.value == null || this.value == undefined) {
      next.state = LinkStates.stop;
    }
    else {
      next.state = LinkStates.continue;
      next.value = this.value;
    }

    return next;
  }


  $if(func: (t: T) => boolean) {

    var next = this.createNext();
    if (this.state == LinkStates.continue && func != null && func(this.value!) == true) {
      next.state = LinkStates.continue;
      next.value = this.value;
    }
    else {
      next.state = LinkStates.stop;
    }

    return next;
  }

  $run(func: (t: T) => void) {

    if (this.state == LinkStates.continue && func != null) {
      func(this.value!);
    }

  }

  $getWithMap<T1>(func: (t: T) => T1): T1 | null {

    if (this.state == LinkStates.continue) {
      return func(this.value!);
    }
    else
      return null;
  }


  $get(): T | null {

    if (this.state == LinkStates.continue) {
      return this.value!;
    }
    else
      return null;
  }

  $getParent<T1>(backLevel: number = 0): LinkObject<T1> {



    var next = this.createOtherNext<T1>();

    // console.log("parents",this.parents);

    if (this.state == LinkStates.stop || this.parents.length == 0) {
      //  next.value=null;
      next.state = LinkStates.stop;
      //  console.log("getParent",backLevel,next);
      return next;
    }

    // var t1:LinkObject<T1>=next;

    // if(this.parents.length==0)
    //   return next;

    if (backLevel > this.parents.length - 1) {
      //计数超过最顶层，使用最顶层 root
      // console.log("getParent",backLevel,this.parents[this.parents.length-1]);
      return this.parents[this.parents.length - 1];
    }
    else {
      // console.log("getParent",backLevel,this.parents[backLevel]);
      return this.parents[backLevel];
    }

    // return t1;
  }

  $map<T1>(func: (t: T) => T1): LinkObject<T1> {

    var next = new LinkObject<T1>();

    if (this.state == LinkStates.continue && func != null) {
      next.state = LinkStates.continue;
      next.value = func(this.value!);

      //存储自身
      next.parents.push(this);
    }
    else {
      next.state = LinkStates.stop;
      next.value = null;

      next.parents.push(this);
    }

    return next;

  }

  $log(name: string = "linkObject", on: boolean = true): LinkObject<T> {
    if (on)
      console.log(name, this.state, this.value);

    return this;
  }

  $logSelf(name: string = "linkObject", on: boolean = true): LinkObject<T> {
    if (on)
      console.log(name, this);

    return this;
  }

  $if_true() {
    if (this.state == LinkStates.continue)
      return true;
    else
      return false;
  }

}



/////////////////////////////



declare global {

  function $not_null<T>(t: T): LinkObject<T>;
  function $not_empty<T extends string>(t: T): LinkObject<T>;
  function $has_item<T>(array: Array<T>): LinkObject<Array<T>>;
  function $if<T>(t: T, func: (t: T) => boolean): LinkObject<T>

  function $choose<T>(array: LinkObject<T>[]): LinkObject<T>;


  function $number<T>(t: T, isfloat?: boolean): number;

  function $float<T>(t: T): number;
  function $int<T>(t: T): number;
}


_global.$number = function <T>(t: T, isfloat?: boolean): number {
  if (typeof t == "number")
    return t;
  else if (typeof t == "string") {
    if (isfloat) {
      return Number.parseFloat(t);
    }
    else {
      return Number.parseInt(t);
    }
  }
  else {
    throw "error";

  }

}


_global.$float = function <T>(t: T): number {
  if (typeof t == "number")
    return t;
  else if (typeof t == "string") {
    return Number.parseFloat(t);
  }
  else {
    throw "error";

  }

}

_global.$int = function <T>(t: T): number {
  if (typeof t == "number")
    return t;
  else if (typeof t == "string") {
    return Number.parseInt(t);
  }
  else {
    throw "error";

  }

}


_global.$not_null = function <T>(t: T): LinkObject<T> {
  var next = new LinkObject<T>();
  if (t == null || t == undefined) {
    next.state = LinkStates.stop;
  }
  else {
    next.state = LinkStates.continue;
    next.value = t;
  }

  return next;
}


_global.$not_empty = function <T extends string>(t: T): LinkObject<T> {
  var next = new LinkObject<T>();
  if (t == null || t == undefined || t == "") {
    next.state = LinkStates.stop;
  }
  else {
    next.state = LinkStates.continue;
    next.value = t;
  }

  return next;
}

_global.$has_item = function <T>(array: Array<T>): LinkObject<Array<T>> {
  var next = new LinkObject<Array<T>>();
  if (array == null || array == undefined || array.length == 0) {
    next.state = LinkStates.stop;
  }
  else {
    next.state = LinkStates.continue;
    next.value = array;
  }

  return next;
}



_global.$if = function <T>(t: T, func: (t: T) => boolean) {
  var next = new LinkObject<T>();
  if (func != null && func(t) == true) {
    next.state = LinkStates.continue;
    next.value = t;
  }
  else {
    next.state = LinkStates.stop;
  }

  return next;
}


_global.$choose = function <T>(array: LinkObject<T>[]): LinkObject<T> {

  var next = new LinkObject<T>();
  next.value = null;
  next.state = LinkStates.stop;

  // console.log("array",array);
  for (const item of array) {
    if (item.state == LinkStates.continue) {
      next.state = LinkStates.continue;
      next.value = item.value;
      return next;
    }
  }
  return next;
}



