import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Hike } from './hike.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Hike>;

@Injectable()
export class HikeService {

    private resourceUrl =  SERVER_API_URL + 'api/hikes';
    private resourceUrlyourhikes =  SERVER_API_URL + 'api/hikes/yourhikes';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(hike: Hike): Observable<EntityResponseType> {
        const copy = this.convert(hike);
        return this.http.post<Hike>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(hike: Hike): Observable<EntityResponseType> {
        const copy = this.convert(hike);
        return this.http.put<Hike>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Hike>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Hike[]>> {
        const options = createRequestOption(req);
        return this.http.get<Hike[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Hike[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    search(req?: any): Observable<HttpResponse<Hike[]>> {
        const options = createRequestOption(req);
        return this.http.get<Hike[]>(this.resourceUrlyourhikes, { params: options, observe: 'response' })
            .map((res: HttpResponse<Hike[]>) => this.convertArrayResponse(res));
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Hike = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Hike[]>): HttpResponse<Hike[]> {
        const jsonResponse: Hike[] = res.body;
        const body: Hike[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Hike.
     */
    private convertItemFromServer(hike: Hike): Hike {
        const copy: Hike = Object.assign({}, hike);
        copy.date = this.dateUtils
            .convertDateTimeFromServer(hike.date);
        return copy;
    }

    /**
     * Convert a Hike to a JSON which can be sent to the server.
     */
    private convert(hike: Hike): Hike {
        const copy: Hike = Object.assign({}, hike);

        copy.date = this.dateUtils.toDate(hike.date);
        return copy;
    }
}
