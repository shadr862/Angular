"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Employee_id;
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    constructor(id, name, address) {
        _Employee_id.set(this, void 0);
        __classPrivateFieldSet(this, _Employee_id, id, "f");
        this.name = name;
        this.address = address;
    }
    get EId() {
        return __classPrivateFieldGet(this, _Employee_id, "f");
    }
    set EId(id) {
        __classPrivateFieldSet(this, _Employee_id, id, "f");
    }
    static getEmployeeCount() {
        return 100;
    }
    getNameWithAddress() {
        return `${this.name} stay at ${this.address}`;
    }
    Login() {
        return { id: __classPrivateFieldGet(this, _Employee_id, "f"), name: this.name, email: ".@example.com", age: 30 };
    }
}
_Employee_id = new WeakMap();
class Manager extends Employee {
    constructor(id, name, address) {
        super(id, name, address);
    }
}
let emp1 = new Employee(1, "John Doe", "123 Main St");
console.log(emp1.EId, emp1);
console.log(emp1.getNameWithAddress());
console.log(Employee.getEmployeeCount()); // Static method call
let Manager1 = new Manager(2, "Jane Smith", "456 Elm St");
console.log(Manager1.EId, Manager1);
console.log(Manager1.getNameWithAddress());
