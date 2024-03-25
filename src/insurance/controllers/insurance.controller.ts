import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InsuranceService } from '../services/insurance.service';
import { CreateInsuranceDto } from '../dto/create-insurance.dto';
import { UpdateInsuranceDto } from '../dto/update-insurance.dto';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiProperty,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Insurance')
@Controller('insurance')
export class InsuranceController {
  constructor(private readonly _insuranceService: InsuranceService) {}

  @Get()
  @ApiQuery({ name: 'searchterm' })
  @ApiResponse({ status: HttpStatus.OK, description: 'get all insurances' })
  async findAll(@Query('searchTerm') searchTerm: string) {
    return await this._insuranceService.findAll(searchTerm);
  }

  @Get('most-popular')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'get the most popular insurance policies',
  })
  @ApiOperation({
    summary: 'Obtains the top 5 most popular insurance policies.',
  })
  async findMostPopular() {
    return await this._insuranceService.findMostPopular();
  }

  @Post()
  @ApiBody({ type: CreateInsuranceDto, required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async create(@Body() insuranceDto: CreateInsuranceDto) {
    return await this._insuranceService.create(insuranceDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', required: true, description: 'insurance id' })
  @ApiBody({ type: UpdateInsuranceDto, required: true })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() insuranceDto: UpdateInsuranceDto,
  ) {
    return await this._insuranceService.update(id, insuranceDto);
  }

  @Put('increase-rating')
  @ApiParam({ name: 'id', required: true, description: 'insurance id' })
  @ApiBody({
    type: 'number',
    required: true,
    description: 'new insurance rating',
  })
  @ApiProperty({ name: 'rating', type: 'number' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async updateRating(
    @Param('id', new ParseIntPipe()) id: number,
    @Body('rating', new ParseIntPipe()) rating: number,
  ) {
    return this._insuranceService.updateRating(id, rating);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'insurance id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    return await this._insuranceService.delete(id);
  }
}
