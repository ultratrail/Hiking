import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HikingHikesModule } from './hikes/hikes.module';
/* jhipster-needle-add-pageset-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HikingHikesModule,
        /* jhipster-needle-add-pageset-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HikingPageSetsModule {}
