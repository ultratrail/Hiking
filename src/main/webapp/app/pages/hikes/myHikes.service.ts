import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { MyHikes } from './myHikes.model';
import { createRequestOption } from '../../shared';

export type MyHikesResponseType = HttpResponse<MyHikes>;
export type MyHikesArrayResponseType = HttpResponse<MyHikes[]>;

@Injectable()
export class MyHikesService {

    private resourceUrl = SERVER_API_URL + 'api/hikes/my-hikes';

    constructor(private http: HttpClient) { }

    query(req?: any): Observable<MyHikesResponseType> {
        const options = createRequestOption(req);
        return this.http.get<MyHikes>(this.resourceUrl, { observe: 'response' })
            .map((res: MyHikesResponseType) => this.convertResponse(res));
    }

    private convertResponse(res: MyHikesResponseType): MyHikesResponseType {
        const body: MyHikes = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: MyHikesArrayResponseType): MyHikesArrayResponseType {
        const jsonResponse: MyHikes[] = res.body;
        const body: MyHikes[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to MyHikes.
     */
    private convertItemFromServer(json: any): MyHikes {
        const copy: MyHikes = Object.assign(new MyHikes(), json);
        return copy;
    }

    /**
     * Convert a MyHikes to a JSON which can be sent to the server.
     */
    private convert(myHikes: MyHikes): MyHikes {
        const copy: MyHikes = Object.assign({}, myHikes);
        return copy;
    }
}
