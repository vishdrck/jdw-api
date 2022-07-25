import { PartialType } from '@nestjs/swagger';
import { CreateCourseIntakeDto } from './create-course-intake.dto';

export class UpdateCourseIntakeDto extends PartialType(CreateCourseIntakeDto) {}
