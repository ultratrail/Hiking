/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { HikingTestModule } from '../../../test.module';
import { HikerComponent } from '../../../../../../main/webapp/app/entities/hiker/hiker.component';
import { HikerService } from '../../../../../../main/webapp/app/entities/hiker/hiker.service';
import { Hiker } from '../../../../../../main/webapp/app/entities/hiker/hiker.model';

describe('Component Tests', () => {

    describe('Hiker Management Component', () => {
        let comp: HikerComponent;
        let fixture: ComponentFixture<HikerComponent>;
        let service: HikerService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HikingTestModule],
                declarations: [HikerComponent],
                providers: [
                    HikerService
                ]
            })
            .overrideTemplate(HikerComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HikerComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HikerService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Hiker(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.hikers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
