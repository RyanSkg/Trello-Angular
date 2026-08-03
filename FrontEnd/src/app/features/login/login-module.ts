import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing-module';
import { LoginPage } from './login-page/login-page';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, FormsModule, LoginRoutingModule],
})
export class LoginModule {}
