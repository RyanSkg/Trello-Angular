import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Sidebar } from './components/sidebar/sidebar';

@NgModule({
  declarations: [Sidebar],
  imports: [CommonModule, RouterModule],
  exports: [Sidebar],
})
export class CoreModule {}
