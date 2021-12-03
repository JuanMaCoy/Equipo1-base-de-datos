import {model, property} from '@loopback/repository';
import {Person} from '.';

@model()
export class PetOwner extends Person {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<PetOwner>) {
    super(data);
  }
}

export interface PetOwnerRelations {
  // describe navigational properties here
}

export type PetOwnerWithRelations = PetOwner & PetOwnerRelations;
