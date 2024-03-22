import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Insurance } from '../entities/insurance.entity';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateInsuranceDto } from '../dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../dto/update-insurance.dto';

@Injectable()
export class InsuranceService {
  constructor(
    @InjectRepository(Insurance)
    private readonly _repository: Repository<Insurance>,
  ) {}

  async findMostPopular() {
    return await this._repository.find({
      where: { rating: MoreThanOrEqual(4), status: true },
      take: 6,
      select: { name: true, logo: true },
    });
  }

  async findAll() {
    return await this._repository.find({ where: { status: true } });
  }

  async create(insuranceDto: CreateInsuranceDto) {
    const newInsurance = new Insurance();
    newInsurance.name = insuranceDto.name;
    return await this._repository.save(newInsurance);
  }

  async update(id: number, insuranceDto: UpdateInsuranceDto) {
    const foundInsurance = await this._repository.findOne({ where: { id } });
    if (!foundInsurance) return;
    const newObject = Object.assign(foundInsurance, insuranceDto);
    return await this._repository.save(newObject);
  }

  async delete(id: number) {
    return await this._repository.delete(id);
  }
}
