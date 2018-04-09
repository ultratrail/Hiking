import { BaseEntity } from './../../shared';

export class Hike implements BaseEntity {
    constructor(
        public id?: number,
        public hikename?: string,
        public meetingplace?: string,
        public positivedrop?: number,
        public duration?: number,
        public date?: any,
        public messages?: BaseEntity[],
        public walkers?: BaseEntity[],
    ) {
    }
}
