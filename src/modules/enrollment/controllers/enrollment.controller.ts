import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { CreateEnrollmentDto } from '../dto/create-enrollment.dto';
import { CreateResponseEnrollmentDto } from '../dto/create-response-enrollment.dto';
import { IEnrollment } from '../models/enrollment.model';
import { EnrollmentService } from '../services/enrollment.service';

@ApiTags('enrollments')
@Controller('enrollment')
export class EnrollmentController {
  constructor(private readonly enrollmentService: EnrollmentService, private readonly usersService, private readonly courseService) {}

  @ApiDocGenerator({
    summary: 'Create an enrollment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseEnrollmentDto,
    useDTOValidations: true,
  })
  @Post()
  async create(@Body() requestBody: CreateEnrollmentDto) {
    const foundCourse = await this.courseService.findById(new Types.ObjectId(requestBody.courseId));
    if (!foundCourse) throw new NotFoundException('Course not found');

    const foundUser = await this.usersService.findById(new Types.ObjectId(requestBody.userId));
    if (!foundUser) throw new NotFoundException('User not found');

    const newEnrollement: IEnrollment = {
      ...requestBody,
      enrolledDate: new Date(Date.now()),
    };

    const enrollementOnDatabase = await this.enrollmentService.addDocument(newEnrollement);

    if (enrollementOnDatabase) {
      return {
        message: 'Enrolled sucessfully',
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
}
