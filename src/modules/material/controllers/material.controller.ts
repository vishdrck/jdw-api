import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { IntakeService } from 'src/modules/intake/services/intake.service';
import { CreateMaterialDto } from '../dto/create-material.dto';
import { CreateResponseMaterialDto } from '../dto/create-response-material.dto';
import { DeleteMultipleMaterialsDTO } from '../dto/delete-multiple-materials.dto';
import { UpdateMaterialDto } from '../dto/update-material.dto';
import { IMaterial } from '../models/materials.model';
import { MaterialService } from '../services/material.service';

@ApiTags('materials')
@Controller('material')
export class MaterialController {
  constructor(private readonly materialService: MaterialService, private readonly intakeService: IntakeService) {}

  @ApiDocGenerator({
    summary: 'Delete multiple courses',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseMaterialDto,
    useDTOValidations: true,
  })
  @Post()
  async create(@Body() requestBody: CreateMaterialDto) {
    const foundIntake = await this.intakeService.findById(new Types.ObjectId(requestBody.intakeId));

    if (!foundIntake) throw new NotFoundException('Requested intake is not found');

    const newMaterial: IMaterial = {
      ...requestBody,
    };

    const materialOnDatabase = await this.materialService.addDocument(newMaterial);

    if (materialOnDatabase) {
      return {
        message: 'Material added successfully',
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Delete multiple materials',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Delete()
  async deleteMultiple(@Body() requestBody: DeleteMultipleMaterialsDTO) {
    const isDeleted = await this.materialService
      ?.getModel()
      ?.updateMany({ _id: { $in: requestBody.materialIds } }, { $set: { isDeleted: true } })
      ?.exec();

    if (isDeleted) {
      return {
        message: 'Material deleted successfully',
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get single material',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Get(':id')
  async get(@Param(':id') id: string) {
    const foundMaterial = await this.materialService.findById(new Types.ObjectId(id));

    if (!foundMaterial) throw new NotFoundException('Material not found');

    return {
      data: foundMaterial,
    };
  }

  @ApiDocGenerator({
    summary: 'Update given material',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Put(':id')
  async update(@Param(':id') id: string, @Body() requestBody: UpdateMaterialDto) {
    const foundMaterial = await this.materialService.findById(new Types.ObjectId(id));

    if (!foundMaterial) throw new NotFoundException('Course not found');

    const newMaterial: IMaterial = {
      ...foundMaterial,
      ...requestBody,
    };

    const materialOnDatabase = await this.materialService.updateDocument(newMaterial);

    if (materialOnDatabase) {
      return {
        message: 'Material updated successfully',
        data: materialOnDatabase,
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong',
      };
    }
  }
}
