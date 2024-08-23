export { };

declare global {

  interface NumberConstructor {
    MustNumber(num: number): number;
    isNumber(num: number): boolean
  }

  interface Number {

    /** 控制小数数目 .5 进位 */
    FixedTo(count: number): number

    /** 控制小数数目 舍去 */
    SmallFixedTo(count: number): number
    ToInt(): number
    // MustNumber():number
    // isNumber():boolean;

    ToBinary(fit: number): string
  }
}

Number.prototype.FixedTo = function (count: number): number {
  var num = this as number;
  var str = num.toFixed(count);
  var num1 = Number.parseFloat(str);
  return num1;
}

Number.prototype.ToInt = function (): number {
  var num = this as number;
  return Math.floor(num);
}

Number.MustNumber = function (num: number): number {
  // var num =this as number;
  return Number.parseInt(num + "");
}

Number.isNumber = function (num: number): boolean {
  // var num = this as number;

  var v1 = num + 1;
  var v2 = Number.MustNumber(num) + 1;

  console.log("num", v1, v2, v1 === v2);
  return v1 == v2;
}

Number.prototype.FixedTo = function (count: number): number {
  var num = this as number;
  var str = num.toFixed(count);
  var num1 = Number.parseFloat(str);
  return num1;
}

Number.prototype.SmallFixedTo = function (count: number): number {
  var num = this as number;


  if (count == 0)
    return Number.parseInt(num.toString());
  else {
    var div = Math.pow(10, num);
    var num1 = Number.parseInt((num * div).toString()) / div;
  }

  return num1;
}

Number.prototype.ToInt = function (): number {
  var num = this as number;
  return Math.floor(num);
}

// Number.MustNumber = function (num:number):number  { 
//   // var num =this as number;
//   return Number.parseInt(num+"");
// } 

// Number.isNumber = function (num:number):boolean  { 
//   // var num = this as number;

//   var v1=num+1;
//   var v2=Number.MustNumber(num)+1;

//   console.log("num",v1,v2,v1===v2);
//   return v1==v2;
// } 

Number.prototype.ToBinary = function ToBinary(fit: number) {
  var dec = this as number;
  if (dec >= 0) {
    return dec.toString(2).padStart(fit, '0');
  }
  else {
    return (~dec).toString(2).padStart(fit, '0');
  }
}