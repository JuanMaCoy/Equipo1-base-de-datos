import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {PetOwner, PetOwnerRelations} from '../models';

export class PetOwnerRepository extends DefaultCrudRepository<
  PetOwner,
  typeof PetOwner.prototype.id,
  PetOwnerRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(PetOwner, dataSource);
  }
}
