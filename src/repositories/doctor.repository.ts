import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Doctor, DoctorRelations, VetClinic, Request, PetType} from '../models';
import {VetClinicRepository} from './vet-clinic.repository';
import {RequestRepository} from './request.repository';
import {PetTypeRepository} from './pet-type.repository';

export class DoctorRepository extends DefaultCrudRepository<
  Doctor,
  typeof Doctor.prototype.id,
  DoctorRelations
> {

  public readonly Doctor_belongsTo_VetClinic: BelongsToAccessor<VetClinic, typeof Doctor.prototype.id>;

  public readonly requests: HasManyRepositoryFactory<Request, typeof Doctor.prototype.id>;

  public readonly petType: BelongsToAccessor<PetType, typeof Doctor.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VetClinicRepository') protected vetClinicRepositoryGetter: Getter<VetClinicRepository>, @repository.getter('RequestRepository') protected requestRepositoryGetter: Getter<RequestRepository>, @repository.getter('PetTypeRepository') protected petTypeRepositoryGetter: Getter<PetTypeRepository>,
  ) {
    super(Doctor, dataSource);
    this.petType = this.createBelongsToAccessorFor('petType', petTypeRepositoryGetter,);
    this.registerInclusionResolver('petType', this.petType.inclusionResolver);
    this.requests = this.createHasManyRepositoryFactoryFor('requests', requestRepositoryGetter,);
    this.registerInclusionResolver('requests', this.requests.inclusionResolver);
    this.Doctor_belongsTo_VetClinic = this.createBelongsToAccessorFor('Doctor_belongsTo_VetClinic', vetClinicRepositoryGetter,);
    this.registerInclusionResolver('Doctor_belongsTo_VetClinic', this.Doctor_belongsTo_VetClinic.inclusionResolver);
  }
}
