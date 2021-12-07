import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Pet, PetRelations, PetType, Request, PetOwner} from '../models';
import {PetTypeRepository} from './pet-type.repository';
import {RequestRepository} from './request.repository';
import {PetOwnerRepository} from './pet-owner.repository';

export class PetRepository extends DefaultCrudRepository<
  Pet,
  typeof Pet.prototype.id,
  PetRelations
> {

  public readonly Pet_belongsTo_PetType: BelongsToAccessor<PetType, typeof Pet.prototype.id>;

  public readonly requests: HasManyRepositoryFactory<Request, typeof Pet.prototype.id>;

  public readonly Pet_belongsTo_PetOwner: BelongsToAccessor<PetOwner, typeof Pet.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PetTypeRepository') protected petTypeRepositoryGetter: Getter<PetTypeRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('PetOwnerRepository') protected petOwnerRepositoryGetter: Getter<PetOwnerRepository>,
  ) {
    super(Pet, dataSource);
    this.Pet_belongsTo_PetOwner = this.createBelongsToAccessorFor('Pet_belongsTo_PetOwner', petOwnerRepositoryGetter,);
    this.registerInclusionResolver('Pet_belongsTo_PetOwner', this.Pet_belongsTo_PetOwner.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
    this.Pet_belongsTo_PetType = this.createBelongsToAccessorFor('Pet_belongsTo_PetType', petTypeRepositoryGetter,);
    this.registerInclusionResolver('Pet_belongsTo_PetType', this.Pet_belongsTo_PetType.inclusionResolver);
  }
}
