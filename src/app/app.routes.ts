import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './shared/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './shared/guards/is-authenticated.guard';

export const routes: Routes = [

    {
        path: 'auth',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./auth/auth.component').then(c => c.AuthComponent),
        children:[
            {
                path: 'login',
                title: 'title',
                loadComponent: () => import('./auth/pages/login-page/login-page.component').then(c => c.LoginPageComponent),
            },
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'full',
            },
        ]
    },
    {
        path: 'dashboard',
        canActivate: [isAuthenticatedGuard],
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
        children: [
            {
                path: 'home',
                title: 'home',
                loadComponent: () => import('./dashboard/pages/home-page/home-page.component').then(c => c.HomePageComponent),
            },
            {
                path: 'search',
                title: 'search',
                loadComponent: () => import('./dashboard/pages/search-patient-page/search-patient-page.component').then(c => c.SearchPatientPageComponent),
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full',
            },

        ]
    },
    {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full'
      },
    
];
