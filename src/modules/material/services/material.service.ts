import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { CommonService } from 'src/modules/common/services/common.service';
import { IMaterial, IMaterialModel } from '../models/materials.model';

@Injectable()
export class MaterialService extends CommonService<IMaterial> implements OnModuleInit {
  constructor(
    @InjectModel(DB_COLLECTIONS.MATERIALS)
    materialModel: Model<IMaterialModel>,
  ) {
    super(materialModel, DB_COLLECTIONS.MATERIALS);
  }

  onModuleInit() {
    return;
  }
}
