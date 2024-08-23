export { };

declare var window: null;
var window= window || null;
var global = (window /* browser */ || global /* node */) as any;

// var global;
// try
// {
//   global = (window /* browser */ ) as any;
// }
// catch(e)
// {
//   global = (global /* node */) as any;
// }





/////////////////////////////



declare global {

  /** 判断字符串非空的延续执行方法 */
  // function isNotNullOrEmpty<T1>(str: string, func: (str: string) => T1): T1;


  /** 判断对象非空的延续执行方法 */
  // function isNotNull<T, T1>(t: T, func: (t: T) => T1): T1;
  // function ifNotNull<T,T1>(t:T,func:(t:T)=>T1):T1;

  // function chooseOneNotNull<T, T1>(array: T[], get1: (t: T) => T1): T;

  /**非空取值 */
  // function $Get<T, T1>(t:T,func: (t: T) => T1): T1
  // function $Get1<T, T1>(t:T,func: (t: T) => T1,defaultset:T1): T1

  // function $thread<T>(func:()=>T)

}


// _global.isNotNullOrEmpty = function <T1>(str: string, func: (str: string) => T1): T1 {
//   return String.isNotNullOrEmpty(str, func);
// }


// _global.isNotNull = function <T, T1>(t: T, func: (t: T) => T1): T1 {
//   return Object.isNotNull(t, func);
// }

// _global.chooseOneNotNull = function <T, T1>(array: T[], get1: (t) => T1): T {
//   // console.log("array",array);
//   for (const item of array) {
//     if (item != null && get1(item) != null) {
//       return item;
//     }
//   }
//   return null;
// }

// _global.$Get = function <T, T1>(t: T, func: (t: T) => T1): T1 {
//   if (!t)
//     return null;
//   else {
//     if (!func)
//       return null;
//     else
//       return func(t);
//   }
// }

// _global.$Get1 = function <T, T1>(t:T,func: (t: T) => T1,defaultset:T1): T1
// {
//   if (!t)
//     return defaultset;
//   else {
//     if (!func)
//       return defaultset;
//     else
//       return func(t);
//   }
// }

// _global.$thread=function<T>(func:()=>T)
// {
//   console.log("func",func);
//   (async () => {
//     const { job, start, stop } = require("microjob");
//     // import("../global/global");
//     // import "..global/math";
//     // require "../../";
   
//     try {
//       // start the worker pool
//       await start();
   
//       // this function will be executed in another thread
//       const res = await job(() => {
//           return func();
//       });   

//       return res;
     
//     } catch (err) {
//       console.error(err);
//     } finally {
//       // shutdown worker pool
//       await stop();
//     }
//   })();
// }





