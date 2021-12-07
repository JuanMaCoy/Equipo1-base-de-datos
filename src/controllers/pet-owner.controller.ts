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
import {PetOwner} from '../models';
import {PetOwnerRepository} from '../repositories';

export class PetOwnerController {
  constructor(
    @repository(PetOwnerRepository)
    public petOwnerRepository : PetOwnerRepository,
  ) {}

  @post('/pet-owners')
  @response(200, {
    description: 'PetOwner model instance',
    content: {'application/json': {schema: getModelSchemaRef(PetOwner)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetOwner, {
            title: 'NewPetOwner',
            exclude: ['id'],
          }),
        },
      },
    })
    petOwner: Omit<PetOwner, 'id'>,
  ): Promise<PetOwner> {
    return this.petOwnerRepository.create(petOwner);
  }

  @get('/pet-owners/count')
  @response(200, {
    description: 'PetOwner model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(PetOwner) where?: Where<PetOwner>,
  ): Promise<Count> {
    return this.petOwnerRepository.count(where);
  }

  @get('/pet-owners')
  @response(200, {
    description: 'Array of PetOwner model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(PetOwner, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(PetOwner) filter?: Filter<PetOwner>,
  ): Promise<PetOwner[]> {
    return this.petOwnerRepository.find(filter);
  }

  @patch('/pet-owners')
  @response(200, {
    description: 'PetOwner PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetOwner, {partial: true}),
        },
      },
    })
    petOwner: PetOwner,
    @param.where(PetOwner) where?: Where<PetOwner>,
  ): Promise<Count> {
    return this.petOwnerRepository.updateAll(petOwner, where);
  }

  @get('/pet-owners/{id}')
  @response(200, {
    description: 'PetOwner model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(PetOwner, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(PetOwner, {exclude: 'where'}) filter?: FilterExcludingWhere<PetOwner>
  ): Promise<PetOwner> {
    return this.petOwnerRepository.findById(id, filter);
  }

  @patch('/pet-owners/{id}')
  @response(204, {
    description: 'PetOwner PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PetOwner, {partial: true}),
        },
      },
    })
    petOwner: PetOwner,
  ): Promise<void> {
    await this.petOwnerRepository.updateById(id, petOwner);
  }

  @put('/pet-owners/{id}')
  @response(204, {
    description: 'PetOwner PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() petOwner: PetOwner,
  ): Promise<void> {
    await this.petOwnerRepository.replaceById(id, petOwner);
  }

  @del('/pet-owners/{id}')
  @response(204, {
    description: 'PetOwner DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.petOwnerRepository.deleteById(id);
  }
}
