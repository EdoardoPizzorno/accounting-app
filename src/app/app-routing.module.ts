import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'investments',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/investments/investments.module').then(m => m.InvestmentsPageModule)
      },
      {
        path: ':name',
        loadChildren: () => import('./pages/investment-type/investment-type.module').then(m => m.InvestmentTypePageModule)
      }
    ],
  },
  {
    path: 'add',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/add/add.module').then(m => m.AddPageModule)
      },
      {
        path: 'investment',
        children: [
          {
            path: '',
            loadChildren: () => import('./pages/add-investment/add-investment.module').then(m => m.AddInvestmentPageModule)
          },
          {
            path: ':type',
            loadChildren: () => import('./pages/add-investment/add-investment.module').then(m => m.AddInvestmentPageModule)
          }
        ]
      }
    ]
  },
  {
    path: 'history',
    loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'add-investment',
    loadChildren: () => import('./pages/add-investment/add-investment.module').then( m => m.AddInvestmentPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
