import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Doctor, DoctorRelations, VetClinic} from '../models';
import {VetClinicRepository} from './vet-clinic.repository';

export class DoctorRepository extends DefaultCrudRepository<
  Doctor,
  typeof Doctor.prototype.id,
  DoctorRelations
> {

  public readonly belongs_to_VetClinic: BelongsToAccessor<VetClinic, typeof Doctor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VetClinicRepository') protected vetClinicRepositoryGetter: Getter<VetClinicRepository>,
  ) {
    super(Doctor, dataSource);
    this.belongs_to_VetClinic = this.createBelongsToAccessorFor('belongs_to_VetClinic', vetClinicRepositoryGetter,);
    this.registerInclusionResolver('belongs_to_VetClinic', this.belongs_to_VetClinic.inclusionResolver);
  }
}
