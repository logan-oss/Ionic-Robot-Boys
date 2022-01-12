import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RobotListPageRoutingModule } from './robot-list-routing.module';

import { RobotListPage } from './robot-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RobotListPageRoutingModule
  ],
  declarations: [RobotListPage]
})
export class RobotListPageModule {}
