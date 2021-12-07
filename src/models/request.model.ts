import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Doctor} from './doctor.model';
import {PetType} from './pet-type.model';
import {Pet} from './pet.model';
import {VisitLog} from './visit-log.model';
import {PetOwner} from './pet-owner.model';

@model()
export class Request extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateAttention: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @belongsTo(() => Doctor, {name: 'Request_belongsTo_Doctor'})
  idDoctor: string;

  @belongsTo(() => PetType, {name: 'Request_belongsTo_petType'})
  idPetType: string;

  @belongsTo(() => Pet, {name: 'Request_belongsTo_Pet'})
  idPet: string;

  @property({
    type: 'string',
  })
  idVisitLog?: string;

  @hasOne(() => VisitLog, {keyTo: 'idRequest'})
  visitLog: VisitLog;

  @belongsTo(() => PetOwner, {name: 'Request_belongsTo_PetOwner'})
  idPetOwner: string;

  constructor(data?: Partial<Request>) {
    super(data);
  }
}

export interface RequestRelations {
  // describe navigational properties here
}

export type RequestWithRelations = Request & RequestRelations;
