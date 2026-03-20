import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersRoutes } from './users.routes';

@NgModule({
  imports: [RouterModule.forChild(UsersRoutes)],
})
export class UsersFeatureModule {}
