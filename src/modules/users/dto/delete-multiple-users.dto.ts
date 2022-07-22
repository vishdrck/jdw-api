import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray } from 'class-validator';

export class DeleteMultipleUsersDTO {
  @ApiProperty({ example: '[ecw5ewcewcwe6,e5c1ewcdggr]' })
  @IsArray()
  @IsNotEmpty()
  userIds: string[];
}
