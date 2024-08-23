export {};

declare global {


  interface StringConstructor {
    // isNullOrEmpty(str:string):boolean;
    // isNotNullOrEmpty<T1>(str:string,func:(str:string)=>T1):T1
 }

  interface String {
    trimStartCh(ch: string): string;
    trimEndCh(ch:string):string;
    trimCh(ch:string):string;

    trimEndStr(str:string):string;
    /** 切记lambda单行返回{}对象，会被认为是函数而没有返回值 */
    toObj<T>(reg:RegExp,func:(match:RegExpMatchArray)=>T):T[];

    trim1(str: string): string;
    
  }  
  
}



////////////////////////////////////////////////////////

// String.isNullOrEmpty = (str:string) => !str;

// String.isNotNullOrEmpty=function<T1>(str:string,func:(str:string)=>T1):T1
// {
//   if(!str)
//     return null;
//   else
//     return func(str);
// }


//////////////////////////////////////////////////////////////

String.prototype.trimStartCh = function (ch: string) { 
  var s = this as string;
  // console.log("a",this.toString());

  // var s1=s.trim(); 
  
  var match=0;
  for(var i=0;i<s.length-1;i++)
  {
    if(s[i]==ch)
      match++;
    else
      break;
  }  
  
  if(match==0)
    return s;
  else
    return s.substr(match,s.length);

}

String.prototype.trimEndCh = function (ch: string) {
  var s = this as string;
  // console.log("a",this.toString());

  // var s1=s.trim(); 

  var match=0;
  for(var i=s.length-1;i>0;i--)
  {
    if(s[i]==ch)
      match++;
    else
      break;
  }

  if(match==0)
    return s;
  else
    return s.substr(0,s.length-match);

}


String.prototype.trimCh = function (ch: string) {

  var s = this as string;
  // console.log("s",s);
  var s1=s.trimStartCh(ch); 
  // console.log("s1",s1);
  var s2=s1.trimEndCh(ch);
  // console.log("s2",s2);
  return s2;
  

}

String.prototype.trimEndStr = function (str: string) {

  var s = this as string;
  // console.log("s",s);

  if(s.endsWith(str))
    return s.substring(0,s.length-str.length);
  
  else
    return s;

}

String.prototype.toObj=function <T>(reg:RegExp,func:(match:RegExpMatchArray)=>T):T[]
{
  var str = this as string;
  var matches= reg.matches(str);
  if(matches.length>0)
  {
    var query=matches.map(v=>func(v)).filter(v=>v!=null);
    if(query.length>0)
      return query;
    else
      return []; 
  } 
  else
     return [];     
}

String.prototype.trim1 = function (str: string) {
    var s = this as string;
    console.log("a",str,s);
    if (s.startsWith(str)) {
        return s.substring(str.length, s.length);
    }
    return str;
}
