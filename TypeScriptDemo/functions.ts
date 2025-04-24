console.log('normal add function');
function add(num1: number, num2: number): number {
  return num1 + num2;
}
console.log(add(5, 10)); 

console.log('optional parameter in add function');
function add1(num1: number, num2: number,num3?:number): number {
    return num3? num1 + num2 + num3 : num1 + num2;
}
console.log(add1(5, 10));
console.log(add1(5, 10, 15));

console.log('variation of function declaration :subtract function');
const sub = (num1: number, num2: number): number => num1 - num2;
console.log(sub(10, 5));    

console.log('variation of function declaration :subtract function requied parameter');
const sub1 = (num1: number, num2: number,num3=10): number => num1 - num2 - num3;
console.log(sub1(10, 5));
console.log(sub1(10, 5, 2));

console.log('variation of function declaration :multiply function');
const multiply = function (num1: number, num2: number): number {
    return num1 * num2;
} 
console.log(multiply(5, 10));

console.log('rest parameter in add function')
function Add(a:number,b:number,...c:number[]):number{
    return a+b+c.reduce((acc,curr)=> acc+curr,0);
}
console.log(Add(1,2,...[1,2,3,4,5]));
console.log(Add(1,2,1,2,3,4));

console.log('generic function');

function getElement<Type>(arr: Type[]): Type[] {
    return new Array<Type>().concat(arr);
}

console.log(getElement<number>([1,2,3]));
console.log(getElement<string>(['a','b','c']));