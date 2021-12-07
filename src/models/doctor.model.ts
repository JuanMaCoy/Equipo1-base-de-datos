import {belongsTo, hasMany, model, property} from '@loopback/repository';
import {Person} from '.';
import {PetType} from './pet-type.model';
import {Request} from './request.model';
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

  @belongsTo(() => VetClinic, {name: 'Doctor_belongsTo_VetClinic'})
  idVetclinic: string;

  /*   @property({
      type: 'string',
    })
    idVetClinic?: string; */

  @hasMany(() => Request, {keyTo: 'idDoctor'})
  requests: Request[];

  @belongsTo(() => PetType)
  petTypeId: string;

  constructor(data?: Partial<Doctor>) {
    super(data);
  }
}

export interface DoctorRelations {
  // describe navigational properties here
}

export type DoctorWithRelations = Doctor & DoctorRelations;
