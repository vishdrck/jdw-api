import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsBoolean,
  IsOptional,
  IsMongoId,
} from 'class-validator';
import { Types } from 'mongoose';
import { CreateIntakeDto } from './create-intake.dto';

export class CreateResponseIntakeDto extends PartialType(CreateIntakeDto) {
  @ApiProperty({ example: 'sad5asd5as2asd' })
  @IsMongoId()
  _id: Types.ObjectId;
}
