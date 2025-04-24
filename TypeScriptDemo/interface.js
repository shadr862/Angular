"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let address1 = {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001" // optional property             
};
class Employee1 {
    constructor(id, name, address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}
let Rm = new Employee1(1, "John Doe", { street: "123 Main St", city: "New York", state: "NY", zip: "10001" });
console.log(Rm);
let Rm1 = new Employee1(1, "John Doe", { street: "123 Main St", city: "New York", state: "NY" });
console.log(Rm1);
let emp = {
    id: 1,
    name: "John Doe",
    email: ".@example.com",
    age: 30,
    salary: 50000
};
let { name: UserName, email: UserEmail } = emp; // Destructuring
console.log(UserName, UserEmail);
let [users1, users2, ...restUser] = [
    { id: 1, name: "John Doe", email: ".@example.com", age: 30 },
    { id: 2, name: "Jane Smith", email: ".@example.com", age: 25 },
    { id: 3, name: "Alice Johnson", email: ".@example.com", age: 28 },
    { id: 4, name: "Bob Brown", email: ".@example.com", age: 35 },
    { id: 5, name: "Charlie White", email: ".@example.com", age: 40 }
];
console.log(users1);
console.log(users2);
console.log(restUser);
let user4 = restUser.filter((user) => user.age > 30);
console.log(user4);
// interface does not exist in javascript
// it is only used for type checking at compile time
