import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Schema, Types } from 'mongoose';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { CourseService } from 'src/modules/course/services/course.service';
import { IntakeService } from 'src/modules/intake/services/intake.service';
import { CreateCourseIntakeDto } from '../dto/create-course-intake.dto';
import { CreateResponseCourseIntakeDto } from '../dto/create-response-course-intake.dto';
import { ICourseIntake } from '../models/course-intake.model';

import { CourseIntakeService } from '../services/course-intake.service';

@ApiTags('course intakes')
@Controller('course-intake')
export class CourseIntakeController {
  constructor(
    private readonly courseIntakeService: CourseIntakeService,
    private readonly courseService: CourseService,
    private readonly intakeService: IntakeService,
  ) {}

  @ApiDocGenerator({
    summary: 'Create a course intake',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseCourseIntakeDto,
    useDTOValidations: true,
  })
  @Post()
  async create(@Body() requestBody: CreateCourseIntakeDto) {
    const foundCourse = await this.courseService.findById(
      new Types.ObjectId(requestBody?.courseId),
    );

    if (!foundCourse)
      throw new NotFoundException('Requested course not found!');

    const foundIntake = await this.intakeService.findById(
      new Types.ObjectId(requestBody?.intakeId),
    );
    if (!foundIntake) throw new NotFoundException('Requsted intake not found');

    const newCourseIntake: ICourseIntake = {
      ...requestBody,
      ...(requestBody.courseId
        ? { courseId: new Types.ObjectId(requestBody.courseId) }
        : {}),
      ...(requestBody.intakeId
        ? { intakeId: new Types.ObjectId(requestBody.intakeId) }
        : {}),
    };

    const courseIntakeOnDatabase = await this.courseIntakeService.addDocument(
      newCourseIntake,
    );

    if (courseIntakeOnDatabase) {
      return {
        message: 'Course intake added successfully',
        data: courseIntakeOnDatabase,
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
}
