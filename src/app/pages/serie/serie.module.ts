import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeriePageRoutingModule } from './serie-routing.module';

import { SeriePage } from './serie.page';
import {ComponentsModule} from "../../components/components.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SeriePageRoutingModule,
        ComponentsModule
    ],
  declarations: [SeriePage]
})
export class SeriePageModule {}
