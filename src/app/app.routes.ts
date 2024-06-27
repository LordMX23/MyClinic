import { Routes } from '@angular/router';
import { isNotAuthenticatedGuard } from './shared/guards/is-not-authenticated.guard';
import { isAuthenticatedGuard } from './shared/guards/is-authenticated.guard';

export const routes: Routes = [

    {
        path: 'auth',
        canActivate: [isNotAuthenticatedGuard],
        loadComponent: () => import('./auth/auth.component'),
        children:[
            {
                path: 'login',
                title: 'title',
                loadComponent: () => import('./auth/pages/login-page/login-page.component'),
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
        loadComponent: () => import('./dashboard/dashboard.component'),
        children: [
            {
                path: 'home',
                title: 'home',
                loadComponent: () => import('./dashboard/pages/home-page/home-page.component'),
            },
            {
                path: 'search',
                title: 'search',
                loadComponent: () => import('./dashboard/pages/search-patient-page/search-patient-page.component'),
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
