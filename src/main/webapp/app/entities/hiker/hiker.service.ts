import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Hiker } from './hiker.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Hiker>;

@Injectable()
export class HikerService {

    private resourceUrl =  SERVER_API_URL + 'api/hikers';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(hiker: Hiker): Observable<EntityResponseType> {
        const copy = this.convert(hiker);
        return this.http.post<Hiker>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(hiker: Hiker): Observable<EntityResponseType> {
        const copy = this.convert(hiker);
        return this.http.put<Hiker>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Hiker>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Hiker[]>> {
        const options = createRequestOption(req);
        return this.http.get<Hiker[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Hiker[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Hiker = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Hiker[]>): HttpResponse<Hiker[]> {
        const jsonResponse: Hiker[] = res.body;
        const body: Hiker[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Hiker.
     */
    private convertItemFromServer(hiker: Hiker): Hiker {
        const copy: Hiker = Object.assign({}, hiker);
        copy.birthdate = this.dateUtils
            .convertLocalDateFromServer(hiker.birthdate);
        return copy;
    }

    /**
     * Convert a Hiker to a JSON which can be sent to the server.
     */
    private convert(hiker: Hiker): Hiker {
        const copy: Hiker = Object.assign({}, hiker);
        copy.birthdate = this.dateUtils
            .convertLocalDateToServer(hiker.birthdate);
        return copy;
    }
}
