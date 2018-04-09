/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { HikingTestModule } from '../../../test.module';
import { HikeDetailComponent } from '../../../../../../main/webapp/app/entities/hike/hike-detail.component';
import { HikeService } from '../../../../../../main/webapp/app/entities/hike/hike.service';
import { Hike } from '../../../../../../main/webapp/app/entities/hike/hike.model';

describe('Component Tests', () => {

    describe('Hike Management Detail Component', () => {
        let comp: HikeDetailComponent;
        let fixture: ComponentFixture<HikeDetailComponent>;
        let service: HikeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HikingTestModule],
                declarations: [HikeDetailComponent],
                providers: [
                    HikeService
                ]
            })
            .overrideTemplate(HikeDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HikeDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HikeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Hike(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.hike).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
