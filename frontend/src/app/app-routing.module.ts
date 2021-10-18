import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { FamilyComponent } from './family/family.component';
import { LoginComponent } from './login/login.component';
import { MembersComponent } from './members/members.component';
import { NotesComponent } from './notes/notes.component';
import { registerLocaleData } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { UploadfilesComponent } from './uploadfiles/uploadfiles.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/login',
    pathMatch:'full'
  },
  {
    path: 'profile',
    component:ProfileComponent
  },
  {
    path: 'update/:userId',
    component:UpdateComponent
  },
  {
    path:'family',
    component:FamilyComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'members',
    component:MembersComponent
  },
  {
    path:'family',
    component:FamilyComponent
  },
  {
    path:'notes',
    component:NotesComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'upload',
    component:UploadfilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
