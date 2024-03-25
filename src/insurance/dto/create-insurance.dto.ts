import { ApiProperty } from '@nestjs/swagger';
export class CreateInsuranceDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  logo: string;
}
