import { Controller, Get, Post, Body, Patch, Param, Delete, UnprocessableEntityException, Put, NotFoundException } from '@nestjs/common';
import { CreateIntakeDto } from '../dto/create-intake.dto';
import { UpdateIntakeDto } from '../dto/update-intake.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { IIntake } from '../model/intake.model';
import { CreateResponseIntakeDto } from '../dto/create-response-intake.dto';
import { IntakeService } from '../services/intake.service';
import { Types } from 'mongoose';

@ApiTags('intakes')
@Controller('intake')
export class IntakeController {
  constructor(private readonly intakeService: IntakeService) {}

  @ApiDocGenerator({
    summary: 'Create new intake',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseIntakeDto,
    useDTOValidations: true,
  })
  @Post()
  async create(@Body() requestBody: CreateIntakeDto) {
    if (!requestBody) throw new UnprocessableEntityException('Valid data required');

    const newIntake: IIntake = {
      ...requestBody,
    };

    const intakeOnDatabase = await this.intakeService.addDocument(newIntake);

    if (intakeOnDatabase) {
      return {
        message: 'Intake added successully',
        data: intakeOnDatabase,
      };
    } else {
      return {
        sucess: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Update given intake',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseIntakeDto,
    useDTOValidations: true,
  })
  @Put(':id')
  async update(@Param(':id') id: string, @Body() requestBody: CreateIntakeDto) {
    const foundIntake = await this.intakeService.findById(new Types.ObjectId(id));
    if (!foundIntake) throw new NotFoundException('Intake not found');

    if (!requestBody) throw new UnprocessableEntityException('Valid data required');

    const newIntake: IIntake = {
      ...foundIntake,
      ...requestBody,
    };

    const intakeOnDatabase = await this.intakeService.addDocument(newIntake);

    if (intakeOnDatabase) {
      return {
        message: 'Intake updated successully',
        data: intakeOnDatabase,
      };
    } else {
      return {
        sucess: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Delete given intake',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseIntakeDto,
    useDTOValidations: true,
  })
  @Delete(':id')
  async delete(@Param(':id') id: string) {
    const foundIntake = await this.intakeService.findById(new Types.ObjectId(id));
    if (!foundIntake) throw new UnprocessableEntityException('Valid data required');

    foundIntake.isDeleted = true;

    const intakeOnDatabase = await this.intakeService.addDocument(foundIntake);

    if (intakeOnDatabase) {
      return {
        message: 'Intake deleted successully',
        data: intakeOnDatabase,
      };
    } else {
      return {
        sucess: false,
        message: 'Something went wrong',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get given intake',
    unauthorizedResponseDescription: 'Invalid Credentials',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: CreateResponseIntakeDto,
    useDTOValidations: true,
  })
  @Get(':id')
  async get(@Param(':id') id: string) {
    const foundIntake = await this.intakeService.findById(new Types.ObjectId(id));
    if (!foundIntake) throw new UnprocessableEntityException('Valid data required');

    if (foundIntake) {
      return {
        data: foundIntake,
      };
    } else {
      return {
        sucess: false,
        message: 'Something went wrong',
      };
    }
  }
}
