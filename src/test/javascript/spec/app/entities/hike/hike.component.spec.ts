/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HikingTestModule } from '../../../test.module';
import { HikeComponent } from '../../../../../../main/webapp/app/entities/hike/hike.component';
import { HikeService } from '../../../../../../main/webapp/app/entities/hike/hike.service';
import { Hike } from '../../../../../../main/webapp/app/entities/hike/hike.model';

describe('Component Tests', () => {

    describe('Hike Management Component', () => {
        let comp: HikeComponent;
        let fixture: ComponentFixture<HikeComponent>;
        let service: HikeService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HikingTestModule],
                declarations: [HikeComponent],
                providers: [
                    HikeService
                ]
            })
            .overrideTemplate(HikeComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HikeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HikeService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Hike(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.hikes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
