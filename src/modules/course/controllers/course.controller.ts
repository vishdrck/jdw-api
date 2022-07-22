import { Controller, Get, Post, Body, Patch, Param, Delete, UnprocessableEntityException, Put, NotFoundException } from '@nestjs/common';
import { CourseService } from '../services/course.service';
import { CreateCourseDto } from '../dto/create-course.dto';
import { UpdateCourseDto } from '../dto/update-course.dto';
import { ICourse } from '../model/course.model';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { CreateResponseDto } from '../dto/create-response-course.dto';
import { DeleteMultipleCoursesDTO } from '../dto/delete-multiple-courses.dto';

@ApiTags('courses')
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiDocGenerator({
    summary: 'Create new course',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseDto,
    useDTOValidations: true,
  })
  @Post()
  async create(@Body() requestBody: CreateCourseDto) {
    if (!requestBody) throw new UnprocessableEntityException('Valid data required');

    const newCourse: ICourse = {
      ...requestBody,
    };

    const courseOnDatabase = await this.courseService.addDocument(newCourse);

    if (courseOnDatabase) {
      return {
        message: 'Course added successully',
        data: courseOnDatabase,
      };
    } else {
      return {
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Update given course',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: UpdateCourseDto,
    useDTOValidations: true,
  })
  @Put(':id')
  async update(@Param(':id') id: string, @Body() requestBody: UpdateCourseDto) {
    const foundCourse = await this.courseService.findById(new Types.ObjectId(id));

    if (!foundCourse) throw new NotFoundException('Course not found');

    const newCourse: ICourse = {
      ...foundCourse,
      ...requestBody,
    };

    const courseOnDatabase = await this.courseService.updateDocument(newCourse);

    if (courseOnDatabase) {
      return {
        message: 'Course updated successfully',
        data: courseOnDatabase,
      };
    } else {
      return {
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Delete multiple courses',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Delete()
  async deleteMultiple(@Body() requestBody: DeleteMultipleCoursesDTO) {
    const isDeleted = await this.courseService
      ?.getModel()
      ?.updateMany({ _id: { $in: requestBody.courseIds } }, { $set: { isDeleted: true } })
      ?.exec();

    if (isDeleted) {
      return {
        message: 'Courses deleted successfully',
      };
    } else {
      return {
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get single courses',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: UpdateCourseDto,
    useDTOValidations: true,
  })
  @Delete(':id')
  async get(@Param(':id') id: string) {
    const foundCourse = await this.courseService.findById(new Types.ObjectId(id));

    if (!foundCourse) throw new NotFoundException('Course not found');

    return {
      data: foundCourse,
    };
  }
}
