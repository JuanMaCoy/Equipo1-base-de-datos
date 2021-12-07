import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Request, RequestRelations, Doctor, PetType, Pet, VisitLog, PetOwner} from '../models';
import {DoctorRepository} from './doctor.repository';
import {PetTypeRepository} from './pet-type.repository';
import {PetRepository} from './pet.repository';
import {VisitLogRepository} from './visit-log.repository';
import {PetOwnerRepository} from './pet-owner.repository';

export class RequestRepository extends DefaultCrudRepository<
  Request,
  typeof Request.prototype.id,
  RequestRelations
> {

  public readonly Request_belongsTo_Doctor: BelongsToAccessor<Doctor, typeof Request.prototype.id>;

  public readonly Request_belongsTo_petType: BelongsToAccessor<PetType, typeof Request.prototype.id>;

  public readonly Request_belongsTo_Pet: BelongsToAccessor<Pet, typeof Request.prototype.id>;

  public readonly visitLog: HasOneRepositoryFactory<VisitLog, typeof Request.prototype.id>;

  public readonly Request_belongsTo_PetOwner: BelongsToAccessor<PetOwner, typeof Request.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>, @repository.getter('PetTypeRepository') protected petTypeRepositoryGetter: Getter<PetTypeRepository>, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>, @repository.getter('VisitLogRepository') protected visitLogRepositoryGetter: Getter<VisitLogRepository>, @repository.getter('PetOwnerRepository') protected petOwnerRepositoryGetter: Getter<PetOwnerRepository>,
  ) {
    super(Request, dataSource);
    this.Request_belongsTo_PetOwner = this.createBelongsToAccessorFor('Request_belongsTo_PetOwner', petOwnerRepositoryGetter,);
    this.registerInclusionResolver('Request_belongsTo_PetOwner', this.Request_belongsTo_PetOwner.inclusionResolver);
    this.visitLog = this.createHasOneRepositoryFactoryFor('visitLog', visitLogRepositoryGetter);
    this.registerInclusionResolver('visitLog', this.visitLog.inclusionResolver);
    this.Request_belongsTo_Pet = this.createBelongsToAccessorFor('Request_belongsTo_Pet', petRepositoryGetter,);
    this.registerInclusionResolver('Request_belongsTo_Pet', this.Request_belongsTo_Pet.inclusionResolver);
    this.Request_belongsTo_petType = this.createBelongsToAccessorFor('Request_belongsTo_petType', petTypeRepositoryGetter,);
    this.registerInclusionResolver('Request_belongsTo_petType', this.Request_belongsTo_petType.inclusionResolver);
    this.Request_belongsTo_Doctor = this.createBelongsToAccessorFor('Request_belongsTo_Doctor', doctorRepositoryGetter,);
    this.registerInclusionResolver('Request_belongsTo_Doctor', this.Request_belongsTo_Doctor.inclusionResolver);
  }
}
