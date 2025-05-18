import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeDetailsGet } from '../employee';

@Pipe({
  name: 'employeeRole'
})
export class EmployeeRolePipe implements PipeTransform {

  transform(employee: EmployeeDetailsGet[], role: string): EmployeeDetailsGet[] {
  
      const val=role.toLocaleLowerCase();
      return employee.filter(e=>e.role.toLocaleLowerCase().includes(val));
    }
  

}
