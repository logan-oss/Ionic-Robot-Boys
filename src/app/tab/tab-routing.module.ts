import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';

const routes: Routes = [
  {
    path: 'tab',
    component: TabPage,
    children: [
      {
        path : 'robots',
        loadChildren: () => import("../robot-list/robot-list.module").then(m => m.RobotListPageModule)
      },
      {
        path : 'home',
        loadChildren: () => import("../home/home.module").then(m => m.HomePageModule)
      },
      {
        path : 'about',
        loadChildren: () => import("../about/about.module").then(m => m.AboutPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tab/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
