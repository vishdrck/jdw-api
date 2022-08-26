import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetUsersQueryDTO {
  @ApiProperty({ example: '6b5fewwefds' })
  @IsString()
  @IsOptional()
  id: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty({ example: 'dfwef43gb3vds' })
  @IsString()
  @IsOptional()
  courseID: string;

  @ApiProperty({ example: '0711234567' })
  @IsString()
  @IsOptional()
  contactNo: string;

  @ApiProperty({ example: '971445152V' })
  @IsString()
  @IsOptional()
  nic: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @IsOptional()
  start: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @IsOptional()
  size: number;
}
