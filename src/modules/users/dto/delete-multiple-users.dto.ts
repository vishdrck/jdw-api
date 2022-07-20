import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';

export class DeleteMultipleUsersDTO {
  @ApiProperty({ example: 'John' })
  @IsArray()
  @IsNotEmpty()
  userIds: string[];
}
