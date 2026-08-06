import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreModule } from '../../core/core-module';
import { DashboardRoutingModule } from './dashboard-routing-module';
import { DashboardPage } from './dashboard-page/dashboard-page';

@NgModule({
  declarations: [DashboardPage],
  imports: [CommonModule, FormsModule, CoreModule, DashboardRoutingModule],
})
export class DashboardModule {}
