import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, UseGuards, Query } from '@nestjs/common';
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
import { JwtAuthGuard } from 'src/modules/authorization/guards/jwt-auth.guard';
import { LoggedUser } from 'src/modules/common/decorators/logged-user.decorator';
import { GetUsersQueryDTO } from '../dto/get-users.query.dto';
import queryBuilder from 'smc-mongoose-query-builder-helper';
import { ResponseService } from 'src/modules/common/services/response.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private responseService: ResponseService) {}

  @ApiDocGenerator({
    summary: 'Update an user',
    unprocessableEntityResponseDescription: 'Invalid user id or invalid user details',
    forbiddenResponseDescription: 'Account Blocked',
    successResponseDTO: UpdateUserDto,
    useDTOValidations: true,
    useBearerAuth: true,
    useApiKey: true,
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@LoggedUser() loggedUser: IUser, @Param('id') id: string, @Body() requestBody: UpdateUserDto) {
    console.log(loggedUser);
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
        message: 'User updated successfully',
        data: userOnDatabase,
      };
    } else {
      return {
        success: false,
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
        message: 'User deleted successfully',
      };
    } else {
      return {
        success: false,
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
        message: 'Users deleted successfully',
      };
    } else {
      return {
        success: false,
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

  @ApiDocGenerator({
    summary: 'Get all user',
    forbiddenResponseDescription: 'Account Blocked',
    useDTOValidations: true,
  })
  @Get('')
  async getAllUSers(@Query() queryParams: GetUsersQueryDTO) {
    let commonFilters = {};
    commonFilters = queryBuilder.patternMatcher(commonFilters, 'first_name', queryParams.firstName);
    commonFilters = queryBuilder.patternMatcher(commonFilters, 'last_name', queryParams.lastName);
    commonFilters = queryBuilder.patternMatcher(commonFilters, 'email', queryParams.email);
    commonFilters = queryBuilder.objectIdMatcher(commonFilters, '_id', queryParams.id);
    commonFilters = queryBuilder.objectIdMatcher(commonFilters, 'courseID', queryParams.courseID);

    const results = await this.usersService.filterDocuments(commonFilters);

    return this.responseService.getPaginatedResponse(results, queryParams.start || 0, queryParams.size || 15);
  }
}

function LoggedIdentity() {
  throw new Error('Function not implemented.');
}
