/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { HikingTestModule } from '../../../test.module';
import { HikerDialogComponent } from '../../../../../../main/webapp/app/entities/hiker/hiker-dialog.component';
import { HikerService } from '../../../../../../main/webapp/app/entities/hiker/hiker.service';
import { Hiker } from '../../../../../../main/webapp/app/entities/hiker/hiker.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { HikeService } from '../../../../../../main/webapp/app/entities/hike';

describe('Component Tests', () => {

    describe('Hiker Management Dialog Component', () => {
        let comp: HikerDialogComponent;
        let fixture: ComponentFixture<HikerDialogComponent>;
        let service: HikerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HikingTestModule],
                declarations: [HikerDialogComponent],
                providers: [
                    UserService,
                    HikeService,
                    HikerService
                ]
            })
            .overrideTemplate(HikerDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HikerDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HikerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Hiker(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.hiker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hikerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Hiker();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.hiker = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'hikerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
