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
import { Types } from 'mongoose';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { EnrollmentService } from 'src/modules/enrollment/services/enrollment.service';
import { CreateAttendanceDto } from '../dto/create-attendance.dto';
import { CreateResponseAttendanceDto } from '../dto/create-response-attendance.dto';
import { DeleteMultipleAttendancesDTO } from '../dto/delete-multiple-attendances.dto';
import { IAttendance } from '../models/attendance.model';
import { AttendanceService } from '../services/attendance.service';

@ApiTags('attendances')
@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly enrollementService: EnrollmentService,
  ) {}

  @ApiDocGenerator({
    summary: 'Create an attendance',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseAttendanceDto,
    useDTOValidations: true,
  })
  @Post()
  async create(@Body() requestBody: CreateAttendanceDto) {
    const foundEnrollement = await this.enrollementService.findById(
      new Types.ObjectId(requestBody?.enrollmentId),
    );
    if (!foundEnrollement)
      throw new NotFoundException('Requested enrollement not found');

    const newAttendance: IAttendance = {
      ...requestBody,
    };

    const attendanceOnDatabase = await this.attendanceService.addDocument(
      newAttendance,
    );

    if (attendanceOnDatabase) {
      return {
        message: 'Attendance created successfully',
        data: attendanceOnDatabase,
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Delete multiple attendances',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Delete()
  async deleteMultiple(@Body() requestBody: DeleteMultipleAttendancesDTO) {
    const isDeleted = await this.attendanceService
      ?.getModel()
      ?.updateMany(
        { _id: { $in: requestBody.attendanceIds } },
        { $set: { isDeleted: true } },
      )
      ?.exec();

    if (isDeleted) {
      return {
        message: 'Attendances deleted successfully',
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get single attendance',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseAttendanceDto,
    useDTOValidations: true,
  })
  @Get(':id')
  async get(@Param(':id') id: string) {
    const foundAttendance = await this.attendanceService.findById(
      new Types.ObjectId(id),
    );

    if (!foundAttendance) throw new NotFoundException('Attendance not found');

    return {
      data: foundAttendance,
    };
  }
}
