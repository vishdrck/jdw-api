import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put, NotFoundException } from '@nestjs/common';
import { InstituteService } from '../services/institute.service';
import { CreateInstituteDto } from '../dto/create-institute.dto';
import { UpdateInstituteDto } from '../dto/update-institute.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { CreateResponseInstituteDto } from '../dto/create-response-institute.dto';
import { IInstitute } from '../model/intitute.model';
import { ResponseInstituteDto } from '../dto/response-institute.dto';
import { Types } from 'mongoose';
import { RESPONSE_MESSAGES } from 'src/modules/common/constants/enums';
import e from 'express';

@ApiTags('institutes')
@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @ApiDocGenerator({
    summary: 'Create new institution',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseInstituteDto,
    useDTOValidations: true,
  })
  @Post()
  async createInstitute(@Body() requestBody: CreateInstituteDto) {
    const newInstitute: IInstitute = {
      ...requestBody,
    };

    const newInstituteOnDatabase = await this.instituteService.addDocument(newInstitute);
    if (newInstituteOnDatabase) {
      return {
        message: 'Institute created successfully',
        data: newInstituteOnDatabase,
      };
    } else {
      return {
        sucess: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Fetch a institution by given id',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: ResponseInstituteDto,
    useDTOValidations: true,
  })
  @Get(':id')
  async getInstitute(@Param('id') id: string) {
    const requestedInsititute = await this.instituteService.findById(new Types.ObjectId(id));
    if (requestedInsititute) {
      return {
        message: 'Institute feteched successfully',
        data: requestedInsititute,
      };
    } else {
      return {
        message: 'Institute not found',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get all institutions',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: ResponseInstituteDto,
    useDTOValidations: true,
  })
  @Get()
  async getAllInstitute() {
    const allInstitutes = await this.instituteService.filterDocuments({ isDeleted: false });
    if (allInstitutes) {
      return {
        message: 'Institutes feteched successfully',
        data: allInstitutes,
      };
    } else {
      return {
        message: 'Institutes not found',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Update a given instituion ',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: ResponseInstituteDto,
    useDTOValidations: true,
  })
  @Put(':id')
  async updateInstitute(@Body() requestBody: UpdateInstituteDto, @Param('id') id: string) {
    const foundInstitute = await this.instituteService.findById(new Types.ObjectId(id));

    if (!foundInstitute) throw new NotFoundException(RESPONSE_MESSAGES.NOT_FOUND);

    const newInstitute: IInstitute = {
      ...foundInstitute,
      ...requestBody,
    };

    const updatedInstitute = await this.instituteService.updateDocument(newInstitute);

    if (updatedInstitute) {
      return {
        message: 'Updated successfully',
        data: updatedInstitute,
      };
    } else {
      return {
        sucess: false,
        message: 'Something went wrong',
      };
    }
  }
}
