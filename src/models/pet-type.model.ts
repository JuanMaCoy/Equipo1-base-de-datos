import {Entity, model, property} from '@loopback/repository';

@model()
export class PetType extends Entity {
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
  details: string;

  constructor(data?: Partial<PetType>) {
    super(data);
  }
}

export interface PetTypeRelations {
  // describe navigational properties here
}

export type PetTypeWithRelations = PetType & PetTypeRelations;
