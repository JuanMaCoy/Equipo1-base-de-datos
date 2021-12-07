import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {PetType} from '../models';
import {PetTypeRepository} from '../repositories';

export class PetTypeController {
  constructor(
    @repository(PetTypeRepository)
    public petTypeRepository : PetTypeRepository,
  ) {}

  @post('/pet-types')
  @response(200, {
    description: 'PetType model instance',
    content: {'application/json': {schema: getModelSchemaRef(PetType)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetType, {
            title: 'NewPetType',
            exclude: ['id'],
          }),
        },
      },
    })
    petType: Omit<PetType, 'id'>,
  ): Promise<PetType> {
    return this.petTypeRepository.create(petType);
  }

  @get('/pet-types/count')
  @response(200, {
    description: 'PetType model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PetType) where?: Where<PetType>,
  ): Promise<Count> {
    return this.petTypeRepository.count(where);
  }

  @get('/pet-types')
  @response(200, {
    description: 'Array of PetType model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PetType, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PetType) filter?: Filter<PetType>,
  ): Promise<PetType[]> {
    return this.petTypeRepository.find(filter);
  }

  @patch('/pet-types')
  @response(200, {
    description: 'PetType PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetType, {partial: true}),
        },
      },
    })
    petType: PetType,
    @param.where(PetType) where?: Where<PetType>,
  ): Promise<Count> {
    return this.petTypeRepository.updateAll(petType, where);
  }

  @get('/pet-types/{id}')
  @response(200, {
    description: 'PetType model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PetType, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PetType, {exclude: 'where'}) filter?: FilterExcludingWhere<PetType>
  ): Promise<PetType> {
    return this.petTypeRepository.findById(id, filter);
  }

  @patch('/pet-types/{id}')
  @response(204, {
    description: 'PetType PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetType, {partial: true}),
        },
      },
    })
    petType: PetType,
  ): Promise<void> {
    await this.petTypeRepository.updateById(id, petType);
  }

  @put('/pet-types/{id}')
  @response(204, {
    description: 'PetType PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() petType: PetType,
  ): Promise<void> {
    await this.petTypeRepository.replaceById(id, petType);
  }

  @del('/pet-types/{id}')
  @response(204, {
    description: 'PetType DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.petTypeRepository.deleteById(id);
  }
}
