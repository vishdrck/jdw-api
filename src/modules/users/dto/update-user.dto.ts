import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { GENDER_TYPES } from '../constants/enums';

export class UpdateUserDto {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: '0711234567' })
  @IsString()
  @IsOptional()
  contactNo: string;

  @ApiProperty({ example: '0711234567' })
  @IsString()
  @IsOptional()
  nic: string;

  @ApiProperty({ example: '0711234567' })
  @IsString()
  @IsOptional()
  gender: GENDER_TYPES;
}
