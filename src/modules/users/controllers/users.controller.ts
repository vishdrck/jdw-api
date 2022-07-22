import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiDocGenerator } from 'src/modules/common/decorators/api-doc-generator.decorator';
import { GENDER_TYPES, USER_TYPES, ACCOUNT_STATES } from '../constants/enums';
import { IUser } from '../models/user.model';
import { RESPONSE_MESSAGES } from 'src/modules/common/constants/enums';
import { DeleteMultipleUsersDTO } from '../dto/delete-multiple-users.dto';
import { ApiTags } from '@nestjs/swagger';
import { UserResponseDTO } from '../dto/user-response.dto';
import { Types } from 'mongoose';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiDocGenerator({
    summary: 'Update an user',
    unprocessableEntityResponseDescription: 'Invalid user id or invalid user details',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: UpdateUserDto,
    useDTOValidations: true,
  })
  @Put(':id')
  async update(@Param('id') id: string, @Body() requestBody: UpdateUserDto) {
    const existUser = await this.usersService.findDocument({ _id: id, isDeleted: false });

    if (existUser) throw new NotFoundException('Requested user not found');

    if (requestBody?.gender?.toLocaleLowerCase() === 'male') {
      requestBody.gender = GENDER_TYPES.MALE;
    } else if (requestBody?.gender?.toLocaleLowerCase() === 'female') {
      requestBody.gender = GENDER_TYPES.FEMALE;
    } else {
      requestBody.gender = GENDER_TYPES.NOT_SPECIFIED;
    }

    const newUser: IUser = {
      ...existUser,
      ...requestBody,
    };

    const userOnDatabase = await this.usersService.addDocument(newUser);
    if (userOnDatabase) {
      return {
        message: 'User updated sucessfully',
        data: userOnDatabase,
      };
    } else {
      return {
        message: 'Something went wrong. Try again lator',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Delete an user',
    unprocessableEntityResponseDescription: 'Invalid user id',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const existUser = await this.usersService.findDocument({ _id: id, isDeleted: false });

    if (existUser) throw new NotFoundException('Requested user not found');

    existUser.isDeleted = true;

    const userOnDatabase = await this.usersService.addDocument(existUser);
    if (userOnDatabase) {
      return {
        message: 'User deleted sucessfully',
      };
    } else {
      return {
        message: 'Something went wrong. Try again lator',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Delete multitple user',
    unprocessableEntityResponseDescription: 'Invalid user ids',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Delete()
  async deleteMultiple(@Body() requestBody: DeleteMultipleUsersDTO) {
    const response = await this.usersService
      ?.getModel()
      ?.updateMany({ _id: { $in: requestBody.userIds } }, { $set: { isDeleted: true } })
      ?.exec();
    if (response) {
      return {
        message: 'Users deleted sucessfully',
      };
    } else {
      return {
        message: 'Something went wrong. Try again lator',
      };
    }
  }

  @ApiDocGenerator({
    summary: 'Get single user',
    unprocessableEntityResponseDescription: 'Invalid user ids',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: UserResponseDTO,
    useDTOValidations: true,
  })
  @Get(':id')
  async getUser(@Param(':id') id: string) {
    const user = await this.usersService.findById(new Types.ObjectId(id));

    if (!user) throw new NotFoundException('User not found');

    return {
      data: user,
    };
  }
}
