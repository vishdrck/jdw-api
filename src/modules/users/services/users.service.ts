import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAccessCredentials } from 'src/modules/authorization/models/access_credentials.model';
import { AccessCredentialsService } from 'src/modules/authorization/services/access_credential.service';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import logsHelper from 'src/modules/common/helpers/logs.helper';
import passwordHelper from 'src/modules/common/helpers/password.helper';
import { CommonService } from 'src/modules/common/services/common.service';
import { ACCOUNT_STATES, GENDER_TYPES, USER_TYPES } from '../constants/enums';
import { IUser, IUserModel } from '../models/user.model';

@Injectable()
export class UsersService extends CommonService<IUser> implements OnModuleInit {
  constructor(
    @InjectModel(DB_COLLECTIONS.USERS)
    usersModel: Model<IUserModel>,
    private accessCredentialsService: AccessCredentialsService,
  ) {
    super(usersModel, DB_COLLECTIONS.USERS);
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
      if (defaultUserOnDatabase) {
        const defaultCredentials: IAccessCredentials = {
          userID: (await defaultUserOnDatabase)?._id,
          password: await passwordHelper.hash('123456'),
        };
        this.accessCredentialsService.addDocument(defaultCredentials);
      }
    }
    logsHelper.initLog(DB_COLLECTIONS.USERS, 'UserService');
  }
}
