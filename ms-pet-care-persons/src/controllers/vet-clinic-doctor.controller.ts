import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Doctor, VetClinic
} from '../models';
import {VetClinicRepository} from '../repositories';

export class VetClinicDoctorController {
  constructor(
    @repository(VetClinicRepository) protected vetClinicRepository: VetClinicRepository,
  ) { }

  @get('/vet-clinics/{id}/doctors', {
    responses: {
      '200': {
        description: 'Array of VetClinic has many Doctor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Doctor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Doctor>,
  ): Promise<Doctor[]> {
    return this.vetClinicRepository.hasMany_Doctors(id).find(filter);
  }

  @post('/vet-clinics/{id}/doctors', {
    responses: {
      '200': {
        description: 'VetClinic model instance',
        content: {'application/json': {schema: getModelSchemaRef(Doctor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof VetClinic.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctor, {
            title: 'NewDoctorInVetClinic',
            exclude: ['id'],
            optional: ['IdVetClinic']
          }),
        },
      },
    }) doctor: Omit<Doctor, 'id'>,
  ): Promise<Doctor> {
    return this.vetClinicRepository.hasMany_Doctors(id).create(doctor);
  }

  @patch('/vet-clinics/{id}/doctors', {
    responses: {
      '200': {
        description: 'VetClinic.Doctor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Doctor, {partial: true}),
        },
      },
    })
    doctor: Partial<Doctor>,
    @param.query.object('where', getWhereSchemaFor(Doctor)) where?: Where<Doctor>,
  ): Promise<Count> {
    return this.vetClinicRepository.hasMany_Doctors(id).patch(doctor, where);
  }

  @del('/vet-clinics/{id}/doctors', {
    responses: {
      '200': {
        description: 'VetClinic.Doctor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Doctor)) where?: Where<Doctor>,
  ): Promise<Count> {
    return this.vetClinicRepository.hasMany_Doctors(id).delete(where);
  }
}
