import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/constants/enums';
import logsHelper from 'src/modules/common/helpers/logs.helper';
import { CommonService } from 'src/modules/common/services/common.service';
import { ACCOUNT_STATES, GENDER_TYPES, USER_TYPES } from '../constants/enums';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUser, IUserModel } from '../models/user.model';

@Injectable()
export class UsersService extends CommonService<IUser> implements OnModuleInit {
  constructor(
    @InjectModel(DB_COLLECTIONS.USERS)
    userModel: Model<IUserModel>,
  ) {
    super(userModel, DB_COLLECTIONS.USERS);
  }

  async onModuleInit() {
    const users = await this.filterDocuments();
    if (users?.length === 0) {
      const defaultUser: IUser = {
        firstName: 'JDW Admin',
        email: 'vish.drck@gmail.com',
        gender: GENDER_TYPES.MALE,
        userType: USER_TYPES.SUPER_ADMIN,
        accountStatus: ACCOUNT_STATES.VERIFIED,
      };
      const defaultUserOnDatabase = this.addDocument(defaultUser);
    }
    logsHelper.initLog(DB_COLLECTIONS.USERS, 'UserService');
  }
}
