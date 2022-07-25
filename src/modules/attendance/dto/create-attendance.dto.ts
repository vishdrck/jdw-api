import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class CreateAttendanceDto {
  @ApiProperty({ example: 'sdf5wef5ewfe5wftr' })
  @IsMongoId()
  @IsNotEmpty()
  enrollmentId: Types.ObjectId;

  @ApiProperty({ example: '01/05/2022 12:15PM' })
  @IsDate()
  @IsNotEmpty()
  clockInDateTime: Date;
}
