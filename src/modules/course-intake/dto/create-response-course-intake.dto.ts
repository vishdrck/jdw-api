import { ApiProperty } from '@nestjs/swagger';
import { ICourse } from 'src/modules/course/model/course.model';
import { IIntake } from 'src/modules/intake/model/intake.model';

export class CreateResponseCourseIntakeDto {
  @ApiProperty({ example: 'course object' })
  courseId: ICourse;

  @ApiProperty({ example: 'Intake object' })
  intakeId: IIntake;

  @ApiProperty({ example: 2000 })
  registrationPayment?: number;

  @ApiProperty({ example: 5000 })
  coursePayment?: number;
}
