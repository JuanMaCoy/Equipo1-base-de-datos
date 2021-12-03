import {belongsTo, model, property} from '@loopback/repository';
import {Person} from '.';
import {VetClinic} from './vet-clinic.model';

@model()
export class Doctor extends Person {
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
  professionalCard: string;

  @belongsTo(() => VetClinic, {name: 'belongs_to_VetClinic'})
  IdVetClinic: string;

  constructor(data?: Partial<Doctor>) {
    super(data);
  }
}

export interface DoctorRelations {
  // describe navigational properties here
}

export type DoctorWithRelations = Doctor & DoctorRelations;
