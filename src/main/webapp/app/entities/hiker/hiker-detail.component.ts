import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Hiker } from './hiker.model';
import { HikerService } from './hiker.service';

@Component({
    selector: 'jhi-hiker-detail',
    templateUrl: './hiker-detail.component.html'
})
export class HikerDetailComponent implements OnInit, OnDestroy {

    hiker: Hiker;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private hikerService: HikerService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInHikers();
    }

    load(id) {
        this.hikerService.find(id)
            .subscribe((hikerResponse: HttpResponse<Hiker>) => {
                this.hiker = hikerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInHikers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'hikerListModification',
            (response) => this.load(this.hiker.id)
        );
    }
}
