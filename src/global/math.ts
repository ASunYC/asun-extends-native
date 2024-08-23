export { };

declare global {

  interface Math {
    /**[min,max) */
    randomEx(min: number, max: number): number;
  }

}

Math.randomEx = function (min: number, max: number): number {
  // console.log("aaa");

  var random = (Math.random() * (max - min) + min).ToInt();
  // console.log("aaa",random);
  return random;

};


