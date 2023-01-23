import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeriePage } from './serie.page';

const routes: Routes = [
  {
    path: '',
    component: SeriePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeriePageRoutingModule {}
