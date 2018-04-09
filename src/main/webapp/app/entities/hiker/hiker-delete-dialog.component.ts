import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hiker } from './hiker.model';
import { HikerPopupService } from './hiker-popup.service';
import { HikerService } from './hiker.service';

@Component({
    selector: 'jhi-hiker-delete-dialog',
    templateUrl: './hiker-delete-dialog.component.html'
})
export class HikerDeleteDialogComponent {

    hiker: Hiker;

    constructor(
        private hikerService: HikerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hikerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hikerListModification',
                content: 'Deleted an hiker'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hiker-delete-popup',
    template: ''
})
export class HikerDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hikerPopupService: HikerPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hikerPopupService
                .open(HikerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
