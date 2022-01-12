import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RobotNewPageRoutingModule } from './robot-new-routing.module';

import { RobotNewPage } from './robot-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RobotNewPageRoutingModule
  ],
  declarations: [RobotNewPage]
})
export class RobotNewPageModule {}
