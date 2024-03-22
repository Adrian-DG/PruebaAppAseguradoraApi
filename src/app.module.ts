import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InsuranceModule } from './insurance/insurance.module';
import { join } from 'path';
import { Insurance } from './insurance/entities/insurance.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [Insurance],
      synchronize: true,
      logging: ['error', 'query', 'info'],
    }),
    InsuranceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
