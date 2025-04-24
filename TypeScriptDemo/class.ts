import {Login, User} from "./interface";

class Employee implements Login{
    #id : number;
    protected name : string;
    address : string;
    
    constructor(id: number, name: string, address: string) {
        this.#id = id;
        this.name = name;
        this.address = address;
    }
    get EId(): number {
        return this.#id;
    }
    set EId(id: number){
        this.#id = id;
    }
    static getEmployeeCount(): number {
        return 100; 
    }
    getNameWithAddress(): string {
        return `${this.name} stay at ${this.address}`;
    }
    Login(): User {
        return { id: this.#id, name: this.name, email: ".@example.com", age: 30 };
    }


}
class Manager extends Employee{
    constructor(id: number, name: string, address: string) {
        super(id, name, address);
    }
    
}
let emp1 = new Employee(1, "John Doe", "123 Main St");
console.log(emp1.EId,emp1); 
console.log(emp1.getNameWithAddress());

console.log(Employee.getEmployeeCount()); // Static method call

let Manager1 = new Manager(2, "Jane Smith", "456 Elm St");
console.log(Manager1.EId, Manager1);  
console.log(Manager1.getNameWithAddress());