import { ApiProperty } from '@nestjs/swagger';

export class HealthResponseDTO {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Welcome to JDW API v1.0.0' })
  message: string;
}
