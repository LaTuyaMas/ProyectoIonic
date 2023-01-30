import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import {ComponentsModule} from "../../components/components.module";
import {SwiperModule} from "swiper/angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CategoriesPageRoutingModule,
        ComponentsModule,
        SwiperModule
    ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
