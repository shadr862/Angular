import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, EmployeeDetailsGet } from '../employee';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  private refreshNeeded$ = new BehaviorSubject<void>(undefined);

  get refreshNeeded() {
    return this.refreshNeeded$.asObservable();
  }

  triggerRefresh() {
    this.refreshNeeded$.next();
  }

  AddEmployee(employee: Employee) {
    return this.http.post<Employee[]>('https://localhost:44348/api/Employee', employee);
  }

  GetEmployee() {
    return this.http.get<EmployeeDetailsGet[]>('https://localhost:44348/api/Employee');
  }

  DeleteEmployee(id: number) {
    const url = `https://localhost:44348/api/Employee/${id}`;
    return this.http.delete(url);
  }
  EditEmployee(id:number,emloyee:EmployeeDetailsGet)
  {
    const url = `https://localhost:44348/api/Employee/${id}`;
    return this.http.put(url,emloyee);
  }
}
