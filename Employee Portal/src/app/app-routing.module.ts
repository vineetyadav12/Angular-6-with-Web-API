import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { SiteLayoutComponent } from './_layout/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';
import { SiteHeaderComponent } from './_layout/site-header/site-header.component';
import { SiteFooterComponent } from './_layout/site-footer/site-footer.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: SiteLayoutComponent,
        children: [
            { path: 'home', component: HomeComponent, pathMatch: 'full' },
            { path: 'add-user', component: AddUserComponent },
            { path: 'edit-user/:id', component: EditUserComponent },
            { path: 'list-user', component: ListUserComponent }
        ],
        canActivate: [AuthGuard]
    },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AddUserComponent, EditUserComponent, ListUserComponent, LoginComponent,
    SiteLayoutComponent, HomeComponent, SiteHeaderComponent, SiteFooterComponent];
