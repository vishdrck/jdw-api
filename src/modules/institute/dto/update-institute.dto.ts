import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { CreateInstituteDto } from './create-institute.dto';

export class UpdateInstituteDto extends PartialType(CreateInstituteDto) {}
