import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { HikerComponent } from './hiker.component';
import { HikerDetailComponent } from './hiker-detail.component';
import { HikerPopupComponent } from './hiker-dialog.component';
import { HikerDeletePopupComponent } from './hiker-delete-dialog.component';

@Injectable()
export class HikerResolvePagingParams implements Resolve<any> {

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

export const hikerRoute: Routes = [
    {
        path: 'hiker',
        component: HikerComponent,
        resolve: {
            'pagingParams': HikerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'hiker/:id',
        component: HikerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const hikerPopupRoute: Routes = [
    {
        path: 'hiker-new',
        component: HikerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hiker/:id/edit',
        component: HikerPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'hiker/:id/delete',
        component: HikerDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Hikers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
