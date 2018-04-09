import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HikingSharedModule } from '../../shared';
import { HikingAdminModule } from '../../admin/admin.module';
import {
    HikerService,
    HikerPopupService,
    HikerComponent,
    HikerDetailComponent,
    HikerDialogComponent,
    HikerPopupComponent,
    HikerDeletePopupComponent,
    HikerDeleteDialogComponent,
    hikerRoute,
    hikerPopupRoute,
    HikerResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...hikerRoute,
    ...hikerPopupRoute,
];

@NgModule({
    imports: [
        HikingSharedModule,
        HikingAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        HikerComponent,
        HikerDetailComponent,
        HikerDialogComponent,
        HikerDeleteDialogComponent,
        HikerPopupComponent,
        HikerDeletePopupComponent,
    ],
    entryComponents: [
        HikerComponent,
        HikerDialogComponent,
        HikerPopupComponent,
        HikerDeleteDialogComponent,
        HikerDeletePopupComponent,
    ],
    providers: [
        HikerService,
        HikerPopupService,
        HikerResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HikingHikerModule {}
