import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { HikeComponent } from './hike.component';
import { HikeDetailComponent } from './hike-detail.component';
import { HikePopupComponent } from './hike-dialog.component';
import { HikeDeletePopupComponent } from './hike-delete-dialog.component';

@Injectable()
export class HikeResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const hikeRoute: Routes = [
    {
        path: 'hike',
        component: HikeComponent,
        resolve: {
            'pagingParams': HikeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hike/:id',
        component: HikeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hikePopupRoute: Routes = [
    {
        path: 'hike-new',
        component: HikePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hike/:id/edit',
        component: HikePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hike/:id/delete',
        component: HikeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
