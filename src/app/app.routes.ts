import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';

export const routes: Routes = [
    {path:'',redirectTo:'employees',pathMatch:'full'},
    {path:'employee-form',component:EmployeeFormComponent}
];
