import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Hike } from './hike.model';
import { HikePopupService } from './hike-popup.service';
import { HikeService } from './hike.service';
import { Hiker, HikerService } from '../hiker';

@Component({
    selector: 'jhi-hike-dialog',
    templateUrl: './hike-dialog.component.html'
})
export class HikeDialogComponent implements OnInit {

    hike: Hike;
    isSaving: boolean;

    hikers: Hiker[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private hikeService: HikeService,
        private hikerService: HikerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.hikerService.query()
            .subscribe((res: HttpResponse<Hiker[]>) => { this.hikers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.hike.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hikeService.update(this.hike));
        } else {
            this.subscribeToSaveResponse(
                this.hikeService.create(this.hike));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Hike>>) {
        result.subscribe((res: HttpResponse<Hike>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Hike) {
        this.eventManager.broadcast({ name: 'hikeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackHikerById(index: number, item: Hiker) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-hike-popup',
    template: ''
})
export class HikePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hikePopupService: HikePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hikePopupService
                    .open(HikeDialogComponent as Component, params['id']);
            } else {
                this.hikePopupService
                    .open(HikeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
