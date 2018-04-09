import { BaseEntity } from './../../shared';

export class Message implements BaseEntity {
    constructor(
        public id?: number,
        public longitude?: number,
        public latitude?: number,
        public datetime?: any,
        public sos?: boolean,
        public espON?: boolean,
        public heartrate?: number,
        public sender?: BaseEntity,
        public hike?: BaseEntity,
    ) {
        this.sos = false;
        this.espON = false;
    }
}
