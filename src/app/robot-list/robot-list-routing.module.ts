import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RobotListPage } from './robot-list.page';

const routes: Routes = [
  {
    path: '',
    component: RobotListPage
  },
  {
    path: 'new',
    loadChildren: () => import('./robot-new/robot-new.module').then( m => m.RobotNewPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./robot/robot.module').then( m => m.RobotPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotListPageRoutingModule {}
