import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDTO<T> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: 'SUCCESS' })
  message: string;

  @ApiProperty()
  success: boolean;

  @ApiProperty()
  count: number;

  @ApiProperty({ name: 'data', isArray: true })
  data: T[];
}
