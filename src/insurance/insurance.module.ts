import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './entities/insurance.entity';
import { InsuranceController } from './controllers/insurance.controller';
import { InsuranceService } from './services/insurance.service';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance])],
  controllers: [InsuranceController],
  providers: [InsuranceService],
})
export class InsuranceModule {}
