import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Hike } from './hike.model';
import { HikePopupService } from './hike-popup.service';
import { HikeService } from './hike.service';

@Component({
    selector: 'jhi-hike-delete-dialog',
    templateUrl: './hike-delete-dialog.component.html'
})
export class HikeDeleteDialogComponent {

    hike: Hike;

    constructor(
        private hikeService: HikeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.hikeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'hikeListModification',
                content: 'Deleted an hike'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-hike-delete-popup',
    template: ''
})
export class HikeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private hikePopupService: HikePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.hikePopupService
                .open(HikeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
