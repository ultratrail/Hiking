import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { HikingSharedModule } from '../../shared';
import {
    HikeService,
    HikePopupService,
    HikeComponent,
    HikeDetailComponent,
    HikeDialogComponent,
    HikePopupComponent,
    HikeDeletePopupComponent,
    HikeDeleteDialogComponent,
    hikeRoute,
    hikePopupRoute,
    HikeResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...hikeRoute,
    ...hikePopupRoute,
];

@NgModule({
    imports: [
        HikingSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        LeafletModule.forRoot()
    ],
    declarations: [
        HikeComponent,
        HikeDetailComponent,
        HikeDialogComponent,
        HikeDeleteDialogComponent,
        HikePopupComponent,
        HikeDeletePopupComponent,
    ],
    entryComponents: [
        HikeComponent,
        HikeDialogComponent,
        HikePopupComponent,
        HikeDeleteDialogComponent,
        HikeDeletePopupComponent,
    ],
    providers: [
        HikeService,
        HikePopupService,
        HikeResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HikingHikeModule {}
