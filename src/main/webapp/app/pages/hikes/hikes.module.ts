import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HikingSharedModule } from '../../shared';
import {
    MyHikesService,
    MyHikesComponent,
    HikesRoute,
} from './';

const PAGE_SET_STATES = [
    ...HikesRoute,
];

@NgModule({
    imports: [
        HikingSharedModule,
        RouterModule.forRoot(PAGE_SET_STATES, { useHash: true })
    ],
    declarations: [
    MyHikesComponent,
],
    entryComponents: [
    MyHikesComponent,
],
    providers: [
    MyHikesService,
],
schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HikingHikesModule {}
