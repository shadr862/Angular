
interface address {
    street: string;
    city: string;
    state: string;
    zip?: string;
}

let address1: address = {
    street: "123 Main St",
    city: "New York",
    state: "NY",
    zip: "10001" // optional property             
};

class Employee1 {
    id: number;
    name: string;
    address: address;

    constructor(id: number, name: string, address: address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }
}

let Rm = new Employee1(1, "John Doe",
    { street: "123 Main St", city: "New York", state: "NY", zip: "10001" });
console.log(Rm);

let Rm1 = new Employee1(1, "John Doe",
    { street: "123 Main St", city: "New York", state: "NY" });
console.log(Rm1);


export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
}

interface Employees extends User {
    salary: number;
}

let emp: Employees = {
    id: 1,
    name: "John Doe",
    email: ".@example.com",
    age: 30,
    salary: 50000
};

let { name: UserName, email: UserEmail } = emp; // Destructuring
console.log(UserName, UserEmail);

let [users1, users2,...restUser]: User[] = [
    { id: 1, name: "John Doe", email: ".@example.com", age: 30 },
    { id: 2, name: "Jane Smith", email: ".@example.com", age: 25 },
    { id: 3, name: "Alice Johnson", email: ".@example.com", age: 28 },
    { id: 4, name: "Bob Brown", email: ".@example.com", age: 35 },
    { id: 5, name: "Charlie White", email: ".@example.com", age: 40 }
    
];

console.log(users1);
console.log(users2);
console.log(restUser);

let user4=restUser.filter((user: User) => user.age > 30);
console.log(user4);

export interface Login {
    Login(): User;

}
// interface does not exist in javascript
// it is only used for type checking at compile time