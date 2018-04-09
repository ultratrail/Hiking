import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Hiker } from './hiker.model';
import { HikerPopupService } from './hiker-popup.service';
import { HikerService } from './hiker.service';
import { User, UserService } from '../../shared';
import { Hike, HikeService } from '../hike';

@Component({
    selector: 'jhi-hiker-dialog',
    templateUrl: './hiker-dialog.component.html'
})
export class HikerDialogComponent implements OnInit {

    hiker: Hiker;
    isSaving: boolean;

    users: User[];

    hikes: Hike[];
    birthdateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private hikerService: HikerService,
        private userService: UserService,
        private hikeService: HikeService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.hikeService.query()
            .subscribe((res: HttpResponse<Hike[]>) => { this.hikes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.hiker.id !== undefined) {
            this.subscribeToSaveResponse(
                this.hikerService.update(this.hiker));
        } else {
            this.subscribeToSaveResponse(
                this.hikerService.create(this.hiker));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Hiker>>) {
        result.subscribe((res: HttpResponse<Hiker>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Hiker) {
        this.eventManager.broadcast({ name: 'hikerListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackHikeById(index: number, item: Hike) {
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
    selector: 'jhi-hiker-popup',
    template: ''
})
export class HikerPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hikerPopupService: HikerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.hikerPopupService
                    .open(HikerDialogComponent as Component, params['id']);
            } else {
                this.hikerPopupService
                    .open(HikerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
