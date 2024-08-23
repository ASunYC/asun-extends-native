export { }; 


/////////////////////////////

declare global {
  interface RegExp {
    matches(str:string):RegExpMatchArray[];
  }  
}

RegExp.prototype.matches = function(str:string)
{
  var reg = this as RegExp;
  var match;
  var matches:RegExpMatchArray[]=[];
  while (match = reg.exec(str)) {
    // params[decode(match[1])] = decode(match[2]);
      // console.log("match",match);
      matches.push(match);
  }   

  return matches;
}

