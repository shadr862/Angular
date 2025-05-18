import { Pipe, PipeTransform } from '@angular/core';
import { EmployeeDetailsGet } from '../employee';

@Pipe({
  name: 'employeeSerach'
})
export class EmployeeSerachPipe implements PipeTransform {

  transform(employee: EmployeeDetailsGet[], name: string): EmployeeDetailsGet[] {

    const val=name.toLocaleLowerCase();
    return employee.filter(e=>e.name.toLocaleLowerCase().includes(val));
  }

}
