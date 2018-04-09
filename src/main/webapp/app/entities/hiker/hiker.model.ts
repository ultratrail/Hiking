import { BaseEntity, User } from './../../shared';

export const enum Sex {
    'MAN',
    'WOMAN'
}

export class Hiker implements BaseEntity {
    constructor(
        public id?: number,
        public firstname?: string,
        public name?: string,
        public sex?: Sex,
        public birthdate?: any,
        public phonenumber?: string,
        public anaerobicmaximumspeed?: number,
        public weight?: number,
        public user?: User,
        public positions?: BaseEntity[],
        public itineraries?: BaseEntity[],
    ) {
    }
}
