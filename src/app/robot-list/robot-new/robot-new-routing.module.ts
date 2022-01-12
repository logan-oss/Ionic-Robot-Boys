import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RobotNewPage } from './robot-new.page';

const routes: Routes = [
  {
    path: '',
    component: RobotNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RobotNewPageRoutingModule {}
