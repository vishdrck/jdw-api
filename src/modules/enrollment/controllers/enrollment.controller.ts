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
  constructor(private readonly enrollmentService: EnrollmentService) {}

  @ApiDocGenerator({
    summary: 'Create an enrollment',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseEnrollmentDto,
    useDTOValidations: true,
  })
  @Post()
  async create(@Body() requestBody: CreateEnrollmentDto) {
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
