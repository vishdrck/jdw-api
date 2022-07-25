import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { IUser } from 'src/modules/users/models/user.model';

import { CreateAttendanceDto } from './create-attendance.dto';

export class CreateResponseAttendanceDto extends PartialType(CreateAttendanceDto) {
  @ApiProperty({ example: '56d4f34f5sfd' })
  _id: Types.ObjectId;

  @ApiProperty({ example: 'user object' })
  user: IUser;
}
