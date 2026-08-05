import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../../core/core-module';
import { HomeRoutingModule } from './home-routing-module';
import { HomePage } from './home-page/home-page';

@NgModule({
  declarations: [HomePage],
  imports: [CommonModule, CoreModule, HomeRoutingModule],
})
export class HomeModule {}
