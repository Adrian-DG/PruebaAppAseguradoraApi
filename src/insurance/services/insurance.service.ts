import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Insurance } from '../entities/insurance.entity';
import { Repository } from 'typeorm';
import { CreateInsuranceDto } from '../dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../dto/update-insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private readonly _repository: Repository<Insurance>,
  ) {}

  async findAll() {
    return await this._repository.find();
  }

  async create(insuranceDto: CreateInsuranceDto) {
    const newInsurance = new Insurance();
    newInsurance.name = insuranceDto.name;
    newInsurance.logo = insuranceDto.logo;
    return await this._repository.save(newInsurance);
  }

  async update(insuranceDto: UpdateInsuranceDto) {
    const foundInsurance = await this._repository.findOne({
      where: { id: insuranceDto.id },
    });
    if (!foundInsurance) return;
    foundInsurance.name = insuranceDto.name;
    foundInsurance.logo = insuranceDto.logo;
    return await this._repository.save(foundInsurance);
  }

  async delete(id: number) {
    return await this._repository.delete(id);
  }
}
