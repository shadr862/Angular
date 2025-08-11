import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { Binding } from './Binding/binding';

export const routes: Routes = [
    {path:'dashboard',component:Dashboard},
    {path:'binding',component:Binding},
    {path:'',redirectTo:'dashboard',pathMatch:'full'}
];
