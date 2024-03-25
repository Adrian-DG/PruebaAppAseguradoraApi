import { Injectable, Param, ParseIntPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Insurance } from '../entities/insurance.entity';
import { Like, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateInsuranceDto } from '../dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../dto/update-insurance.dto';
import { Contains } from 'class-validator';

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

  async findAll(searchTerm: string) {
    return await this._repository.find({
      where: { name: Like(`%${searchTerm}%`), status: true },
      select: { id: true, name: true, logo: true },
    });
  }

  async create(insuranceDto: CreateInsuranceDto) {
    const newInsurance = new Insurance();
    const newObject = Object.assign(newInsurance, insuranceDto);
    return await this._repository.save(newObject);
  }

  async update(id: number, insuranceDto: UpdateInsuranceDto) {
    const foundInsurance = await this._repository.findOne({ where: { id } });
    if (!foundInsurance) return;
    const newObject = Object.assign(foundInsurance, insuranceDto);
    return await this._repository.save(newObject);
  }

  async updateRating(id: number, rating: number) {
    const foundInsurance = await this._repository.findOne({ where: { id } });
    if (!foundInsurance) return;
    Object.assign(foundInsurance, { rating: rating });
    return await this._repository.save(foundInsurance);
  }

  async delete(id: number) {
    return await this._repository.delete(id);
  }
}
