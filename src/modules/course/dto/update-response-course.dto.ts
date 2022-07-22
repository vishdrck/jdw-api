import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { CreateCourseDto } from './create-course.dto';

export class UpdateResponseDto extends PartialType(CreateCourseDto) {
  @ApiProperty({ example: '5ecwcew65c1wc5' })
  _id: string | Types.ObjectId;
}
