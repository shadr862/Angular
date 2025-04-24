"use strict";
//string for text values
let lname;
lname = "Riaz";
let newName = lname.toUpperCase();
console.log(newName);
//number for numeric values
let age;
age = 25;
age = 25.5;
//convert string to number
let dob = "25";
let result = parseInt(dob);
//boolean
let isValid;
isValid = false;
console.log(isValid);
//array of strings
let empList;
empList = ["Riaz1", "Riaz2", "Riaz3"];
let emp = empList.find((emp) => emp === "Riaz1");
console.log(emp);
//array of numbers
let NumList;
NumList = [1, 2, 3, 4];
let newNum = NumList[0];
console.log(newNum);
//forEach method is used to iterate over the array and perform an action on each element
let results = NumList.filter((num) => num > 2);
console.log(results);
//find method is used to find the first element in the array that matches the condition
//if no element is found it returns undefined
let num = NumList.find((num) => num === 2);
console.log(num);
//sum of all numbers in array
//reduce method is used to reduce the array to a single value
let sum = NumList.reduce((a, b) => a + b);
console.log(sum);
//enum
//enum is a special type in typescript which is used to define a set of named constants
var color;
(function (color) {
    color[color["Red"] = 0] = "Red";
    color[color["Green"] = 1] = "Green";
    color[color["Blue"] = 2] = "Blue";
})(color || (color = {}));
let c = color.Blue;
console.log(c);
//tuple .in tupe out of index showing error in compile time but in array it will not show error in compile time
let swapNums;
function swapNumbers(a, b) {
    return [b, a];
}
swapNums = swapNumbers(10, 20);
swapNums[0];
swapNums[1];
console.log(swapNums);
//any data type
let dpertment;
dpertment = "Riaz";
console.log(dpertment);
dpertment = 25;
console.log(dpertment);
dpertment = true;
console.log(dpertment);
