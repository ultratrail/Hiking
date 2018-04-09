import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HikingHikerModule } from './hiker/hiker.module';
import { HikingMessageModule } from './message/message.module';
import { HikingHikeModule } from './hike/hike.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        HikingHikerModule,
        HikingMessageModule,
        HikingHikeModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HikingEntityModule {}
