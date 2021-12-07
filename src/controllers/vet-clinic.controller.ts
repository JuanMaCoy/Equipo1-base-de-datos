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
import {VetClinic} from '../models';
import {VetClinicRepository} from '../repositories';

export class VetClinicController {
  constructor(
    @repository(VetClinicRepository)
    public vetClinicRepository : VetClinicRepository,
  ) {}

  @post('/vet-clinics')
  @response(200, {
    description: 'VetClinic model instance',
    content: {'application/json': {schema: getModelSchemaRef(VetClinic)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VetClinic, {
            title: 'NewVetClinic',
            exclude: ['id'],
          }),
        },
      },
    })
    vetClinic: Omit<VetClinic, 'id'>,
  ): Promise<VetClinic> {
    return this.vetClinicRepository.create(vetClinic);
  }

  @get('/vet-clinics/count')
  @response(200, {
    description: 'VetClinic model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VetClinic) where?: Where<VetClinic>,
  ): Promise<Count> {
    return this.vetClinicRepository.count(where);
  }

  @get('/vet-clinics')
  @response(200, {
    description: 'Array of VetClinic model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VetClinic, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VetClinic) filter?: Filter<VetClinic>,
  ): Promise<VetClinic[]> {
    return this.vetClinicRepository.find(filter);
  }

  @patch('/vet-clinics')
  @response(200, {
    description: 'VetClinic PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VetClinic, {partial: true}),
        },
      },
    })
    vetClinic: VetClinic,
    @param.where(VetClinic) where?: Where<VetClinic>,
  ): Promise<Count> {
    return this.vetClinicRepository.updateAll(vetClinic, where);
  }

  @get('/vet-clinics/{id}')
  @response(200, {
    description: 'VetClinic model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VetClinic, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VetClinic, {exclude: 'where'}) filter?: FilterExcludingWhere<VetClinic>
  ): Promise<VetClinic> {
    return this.vetClinicRepository.findById(id, filter);
  }

  @patch('/vet-clinics/{id}')
  @response(204, {
    description: 'VetClinic PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VetClinic, {partial: true}),
        },
      },
    })
    vetClinic: VetClinic,
  ): Promise<void> {
    await this.vetClinicRepository.updateById(id, vetClinic);
  }

  @put('/vet-clinics/{id}')
  @response(204, {
    description: 'VetClinic PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() vetClinic: VetClinic,
  ): Promise<void> {
    await this.vetClinicRepository.replaceById(id, vetClinic);
  }

  @del('/vet-clinics/{id}')
  @response(204, {
    description: 'VetClinic DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.vetClinicRepository.deleteById(id);
  }
}
