import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HikingSharedModule } from '../../shared';
import {
    MessageService,
    MessagePopupService,
    MessageComponent,
    MessageDetailComponent,
    MessageDialogComponent,
    MessagePopupComponent,
    MessageDeletePopupComponent,
    MessageDeleteDialogComponent,
    messageRoute,
    messagePopupRoute,
    MessageResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...messageRoute,
    ...messagePopupRoute,
];

@NgModule({
    imports: [
        HikingSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MessageComponent,
        MessageDetailComponent,
        MessageDialogComponent,
        MessageDeleteDialogComponent,
        MessagePopupComponent,
        MessageDeletePopupComponent,
    ],
    entryComponents: [
        MessageComponent,
        MessageDialogComponent,
        MessagePopupComponent,
        MessageDeleteDialogComponent,
        MessageDeletePopupComponent,
    ],
    providers: [
        MessageService,
        MessagePopupService,
        MessageResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HikingMessageModule {}
