import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {PetType} from './pet-type.model';
import {Request} from './request.model';
import {PetOwner} from './pet-owner.model';

@model()
export class Pet extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  skinColor: string;

  @property({
    type: 'string',
    required: true,
  })
  eyesColor: string;

  @property({
    type: 'number',
    required: true,
  })
  height: number;

  @property({
    type: 'string',
    required: true,
  })
  breed: string;

  @belongsTo(() => PetType, {name: 'Pet_belongsTo_PetType'})
  petTypeId: string;

  @hasMany(() => Request, {keyTo: 'idPet'})
  requests: Request[];

  @belongsTo(() => PetOwner, {name: 'Pet_belongsTo_PetOwner'})
  idPetOwner: string;

  constructor(data?: Partial<Pet>) {
    super(data);
  }
}

export interface PetRelations {
  // describe navigational properties here
}

export type PetWithRelations = Pet & PetRelations;
