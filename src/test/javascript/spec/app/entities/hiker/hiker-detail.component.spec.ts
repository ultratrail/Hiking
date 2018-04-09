/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HikingTestModule } from '../../../test.module';
import { HikerDetailComponent } from '../../../../../../main/webapp/app/entities/hiker/hiker-detail.component';
import { HikerService } from '../../../../../../main/webapp/app/entities/hiker/hiker.service';
import { Hiker } from '../../../../../../main/webapp/app/entities/hiker/hiker.model';

describe('Component Tests', () => {

    describe('Hiker Management Detail Component', () => {
        let comp: HikerDetailComponent;
        let fixture: ComponentFixture<HikerDetailComponent>;
        let service: HikerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HikingTestModule],
                declarations: [HikerDetailComponent],
                providers: [
                    HikerService
                ]
            })
            .overrideTemplate(HikerDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HikerDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HikerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Hiker(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.hiker).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
