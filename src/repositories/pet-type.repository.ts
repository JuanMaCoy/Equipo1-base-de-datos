import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PetType, PetTypeRelations, Pet} from '../models';
import {PetRepository} from './pet.repository';

export class PetTypeRepository extends DefaultCrudRepository<
  PetType,
  typeof PetType.prototype.id,
  PetTypeRelations
> {

  public readonly pets: HasManyRepositoryFactory<Pet, typeof PetType.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PetRepository') protected petRepositoryGetter: Getter<PetRepository>,
  ) {
    super(PetType, dataSource);
    this.pets = this.createHasManyRepositoryFactoryFor('pets', petRepositoryGetter,);
    this.registerInclusionResolver('pets', this.pets.inclusionResolver);
  }
}
