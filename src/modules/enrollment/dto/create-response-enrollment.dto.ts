import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { PopulatedDoc, Schema, Types } from 'mongoose';
import { ICourse } from 'src/modules/course/model/course.model';
import { IUser } from 'src/modules/users/models/user.model';
import { CreateEnrollmentDto } from './create-enrollment.dto';

export class CreateResponseEnrollmentDto extends PartialType(
  CreateEnrollmentDto,
) {
  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsMongoId()
  @IsNotEmpty()
  _id: Types.ObjectId;
}
