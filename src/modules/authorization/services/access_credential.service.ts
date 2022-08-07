import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import passwordHelper from 'src/modules/common/helpers/password.helper';
import { CommonService } from 'src/modules/common/services/common.service';
import {
  IAccessCredentials,
  IAccessCredentialsModel,
} from '../models/access_credentials.model';

@Injectable()
export class AccessCredentialsService
  extends CommonService<IAccessCredentials>
  implements OnModuleInit
{
  constructor(
    @InjectModel(DB_COLLECTIONS.ACCESS_CREDENTIALS)
    private accessCredentialsModel: Model<IAccessCredentialsModel>,
    private configService: ConfigService,
  ) {
    super(accessCredentialsModel, DB_COLLECTIONS.ACCESS_CREDENTIALS);
  }

  async onModuleInit() {
    return;
  }

  async loginUser(userID: Types.ObjectId, password: string): Promise<boolean> {
    const credentials = (
      await this.accessCredentialsModel.findOne({ userID })?.exec()
    )?.toObject() as IAccessCredentials;
    return passwordHelper.compare(password, credentials.password);
  }
}
