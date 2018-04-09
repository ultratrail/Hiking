import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Hiker } from './hiker.model';
import { HikerService } from './hiker.service';

@Injectable()
export class HikerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private hikerService: HikerService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.hikerService.find(id)
                    .subscribe((hikerResponse: HttpResponse<Hiker>) => {
                        const hiker: Hiker = hikerResponse.body;
                        if (hiker.birthdate) {
                            hiker.birthdate = {
                                year: hiker.birthdate.getFullYear(),
                                month: hiker.birthdate.getMonth() + 1,
                                day: hiker.birthdate.getDate()
                            };
                        }
                        this.ngbModalRef = this.hikerModalRef(component, hiker);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.hikerModalRef(component, new Hiker());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    hikerModalRef(component: Component, hiker: Hiker): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.hiker = hiker;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
