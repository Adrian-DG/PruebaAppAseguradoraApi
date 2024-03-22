import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { InsuranceService } from '../services/insurance.service';
import { CreateInsuranceDto } from '../dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../dto/update-insurance.dto';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly _insuranceService: InsuranceService) {}

  @Get()
  async findAll() {
    return await this._insuranceService.findAll();
  }

  @Post()
  async create(@Body() insuranceDto: CreateInsuranceDto) {
    return await this._insuranceService.create(insuranceDto);
  }

  @Put()
  async update(@Body() insuranceDto: UpdateInsuranceDto) {
    return await this._insuranceService.update(insuranceDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this._insuranceService.delete(id);
  }
}
