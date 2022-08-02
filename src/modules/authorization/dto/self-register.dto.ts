import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { GENDER_TYPES } from 'src/modules/users/constants/enums';

export class SelfRegisterDTO {
  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'courseID' })
  @IsString()
  @IsNotEmpty()
  courseID: string;

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
