import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { CreateInstituteDto } from './create-institute.dto';

export class CreateResponseInstituteDto extends PartialType(CreateInstituteDto) {
  @ApiProperty({ example: 'd343fwec32ft45223' })
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId;
}
