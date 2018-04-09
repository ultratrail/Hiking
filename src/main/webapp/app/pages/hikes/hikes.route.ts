import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MyHikesComponent } from './myHikes.component';
export const HikesRoute: Routes = [
    {
        path: 'hikes-myHikes',
        component: MyHikesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MyHikes'
        },
        canActivate: [UserRouteAccessService]
    },
];
