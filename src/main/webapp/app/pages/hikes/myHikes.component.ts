import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { Hike } from '../../entities/hike/hike.model';
import { HikeService } from '../../entities/hike/hike.service';
import { MyHikes } from './myHikes.model';
import { MyHikesService } from './myHikes.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-my-hikes',
    templateUrl: './myHikes.component.html'
})
export class MyHikesComponent implements OnInit, OnDestroy {

    myHikes: MyHikes = new MyHikes();
    currentAccount: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    hikes: Hike[];

    constructor(
        private myHikesService: MyHikesService,
        private hikeService: HikeService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.hikeService.search({
            // elements to pass
        }).subscribe(
            (res: HttpResponse<Hike[]>) => {
                this.hikes = res.body;
                // this.order();
            },
            (res: HttpResponse<Hike[]>) => this.onError(res.headers)
            );
        return;

    }

    ngOnInit() {

        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

        this.registerChangeInMyHikes();
    }

    ngOnDestroy() {

        this.eventManager.destroy(this.eventSubscriber);
    }
    registerChangeInMyHikes() {
        this.eventSubscriber = this.eventManager.subscribe('myHikesListModification', (response) => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
