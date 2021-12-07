import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Doctor,
  PetType,
} from '../models';
import {DoctorRepository} from '../repositories';

export class DoctorPetTypeController {
  constructor(
    @repository(DoctorRepository)
    public doctorRepository: DoctorRepository,
  ) { }

  @get('/doctors/{id}/pet-type', {
    responses: {
      '200': {
        description: 'PetType belonging to Doctor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PetType)},
          },
        },
      },
    },
  })
  async getPetType(
    @param.path.string('id') id: typeof Doctor.prototype.id,
  ): Promise<PetType> {
    return this.doctorRepository.petType(id);
  }
}
