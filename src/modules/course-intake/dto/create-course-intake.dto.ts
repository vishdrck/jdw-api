import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateCourseIntakeDto {
  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsMongoId()
  @IsNotEmpty()
  courseId: Types.ObjectId;

  @ApiProperty({ example: '56d4f34f5sfd' })
  @IsMongoId()
  @IsNotEmpty()
  intakeId: Types.ObjectId;

  @ApiProperty({ example: 2000 })
  @IsNumber()
  @IsOptional()
  registrationPayment?: number;

  @ApiProperty({ example: 5000 })
  @IsNumber()
  @IsOptional()
  coursePayment?: number;
}
