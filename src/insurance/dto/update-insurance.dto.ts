import { ApiProperty } from '@nestjs/swagger';

export class UpdateInsuranceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  logo: string;
}
