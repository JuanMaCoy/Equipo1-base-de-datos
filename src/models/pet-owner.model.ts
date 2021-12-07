import {model, property, hasMany} from '@loopback/repository';
import {Person} from '.';
import {Request} from './request.model';
import {Pet} from './pet.model';

@model()
export class PetOwner extends Person {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @hasMany(() => Request, {keyTo: 'idPetOwner'})
  requests: Request[];

  @hasMany(() => Pet, {keyTo: 'idPetOwner'})
  pets: Pet[];

  constructor(data?: Partial<PetOwner>) {
    super(data);
  }
}

export interface PetOwnerRelations {
  // describe navigational properties here
}

export type PetOwnerWithRelations = PetOwner & PetOwnerRelations;
