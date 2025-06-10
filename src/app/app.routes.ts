import { Routes } from '@angular/router';

export const routes: Routes = [
  //{
  //  path: '',
  //  pathMatch: 'full',
  //  loadComponent: () => import(
  //    './components/page/home/home.component'
  //    ).then((m) => m.HomeComponent),
  //},
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import(
      './components/login/login.component'
      ).then((m) => m.LoginComponent)
  },
  {
    path:'register',
    loadComponent: () => import(
      './components/register/register.component'
      ).then((m) => m.RegisterComponent)
  },
  {
    path:'login',
    loadComponent: () => import(
      './components/login/login.component'
      ).then((m) => m.LoginComponent)
  },
  {
    path: 'home',
    loadComponent: () => import(
        './components/page/home/home.component'
      ).then((m) => m.HomeComponent),
  },
  {
path:'add-grade',
  loadComponent: () => import(
  './components/page/add-grade/add-grade.component'
  ).then((m) => m.AddGradeComponent)
},
]
