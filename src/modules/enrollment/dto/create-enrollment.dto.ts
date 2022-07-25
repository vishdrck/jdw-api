import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { PopulatedDoc, Schema, Types } from 'mongoose';
import { ICourse } from 'src/modules/course/model/course.model';
import { IUser } from 'src/modules/users/models/user.model';

export class CreateEnrollmentDto {
  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsMongoId()
  @IsNotEmpty()
  courseId: Types.ObjectId;
}
