import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { FILE_TYPES } from '../constants/enum';

export class CreateMaterialDto {
  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsMongoId()
  @IsNotEmpty()
  intakeId: Types.ObjectId;

  @ApiProperty({ example: 'Course material' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'link to the file' })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({ example: 'FILE' })
  @IsNotEmpty()
  @IsEnum(FILE_TYPES)
  type: FILE_TYPES;

  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsString()
  @IsOptional()
  note?: string;
}
