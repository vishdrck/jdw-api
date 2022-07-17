import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDTO<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;
  @ApiProperty({ example: 'Successfully fetched!' })
  message: string;
  @ApiProperty({ example: true })
  success: boolean;
  @ApiProperty({ example: {} })
  data: T;
}
