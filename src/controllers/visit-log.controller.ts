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
import {VisitLog} from '../models';
import {VisitLogRepository} from '../repositories';

export class VisitLogController {
  constructor(
    @repository(VisitLogRepository)
    public visitLogRepository : VisitLogRepository,
  ) {}

  @post('/visit-logs')
  @response(200, {
    description: 'VisitLog model instance',
    content: {'application/json': {schema: getModelSchemaRef(VisitLog)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitLog, {
            title: 'NewVisitLog',
            exclude: ['id'],
          }),
        },
      },
    })
    visitLog: Omit<VisitLog, 'id'>,
  ): Promise<VisitLog> {
    return this.visitLogRepository.create(visitLog);
  }

  @get('/visit-logs/count')
  @response(200, {
    description: 'VisitLog model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(VisitLog) where?: Where<VisitLog>,
  ): Promise<Count> {
    return this.visitLogRepository.count(where);
  }

  @get('/visit-logs')
  @response(200, {
    description: 'Array of VisitLog model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(VisitLog, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(VisitLog) filter?: Filter<VisitLog>,
  ): Promise<VisitLog[]> {
    return this.visitLogRepository.find(filter);
  }

  @patch('/visit-logs')
  @response(200, {
    description: 'VisitLog PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitLog, {partial: true}),
        },
      },
    })
    visitLog: VisitLog,
    @param.where(VisitLog) where?: Where<VisitLog>,
  ): Promise<Count> {
    return this.visitLogRepository.updateAll(visitLog, where);
  }

  @get('/visit-logs/{id}')
  @response(200, {
    description: 'VisitLog model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(VisitLog, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(VisitLog, {exclude: 'where'}) filter?: FilterExcludingWhere<VisitLog>
  ): Promise<VisitLog> {
    return this.visitLogRepository.findById(id, filter);
  }

  @patch('/visit-logs/{id}')
  @response(204, {
    description: 'VisitLog PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(VisitLog, {partial: true}),
        },
      },
    })
    visitLog: VisitLog,
  ): Promise<void> {
    await this.visitLogRepository.updateById(id, visitLog);
  }

  @put('/visit-logs/{id}')
  @response(204, {
    description: 'VisitLog PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() visitLog: VisitLog,
  ): Promise<void> {
    await this.visitLogRepository.replaceById(id, visitLog);
  }

  @del('/visit-logs/{id}')
  @response(204, {
    description: 'VisitLog DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.visitLogRepository.deleteById(id);
  }
}
