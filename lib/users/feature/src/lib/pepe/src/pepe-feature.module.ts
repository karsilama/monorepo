import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PepeRoutes } from "./pepe-routes";

@NgModule({
  imports: [RouterModule.forChild(PepeRoutes)],
})
export class PepeFeatureModule {}
