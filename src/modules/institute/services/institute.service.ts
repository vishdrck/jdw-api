import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import logsHelper from 'src/modules/common/helpers/logs.helper';
import { CommonService } from 'src/modules/common/services/common.service';
import { IInstitute, IInstituteModel } from '../model/intitute.model';

@Injectable()
export class InstituteService extends CommonService<IInstitute> implements OnModuleInit {
  constructor(
    @InjectModel(DB_COLLECTIONS.INSTITUTES)
    instituteModel: Model<IInstituteModel>,
    private configService: ConfigService,
  ) {
    super(instituteModel, DB_COLLECTIONS.INSTITUTES);
  }

  async onModuleInit() {
    const institute = await this.filterDocuments();
    if (institute?.length === 0) {
      const defaultInstitute: IInstitute = {
        name: 'JDW Japanese Language Academy',
        isRegistrationFee: false,
      };

      await this.addDocument(defaultInstitute);
    }
    logsHelper.initLog(DB_COLLECTIONS.INSTITUTES, InstituteService.name);
  }
}
