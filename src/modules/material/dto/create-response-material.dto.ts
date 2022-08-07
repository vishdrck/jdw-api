import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Types } from 'mongoose';
import { FILE_TYPES } from '../constants/enum';
import { CreateMaterialDto } from './create-material.dto';

export class CreateResponseMaterialDto extends PartialType(CreateMaterialDto) {
  @ApiProperty({ example: '56d4f34f5sfd' })
  _id: Types.ObjectId;
}
