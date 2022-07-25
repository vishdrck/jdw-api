import { Module } from '@nestjs/common';
import { DB_COLLECTIONS } from '../common/constants/enums';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { MaterialController } from './controllers/material.controller';
import { MaterialService } from './services/material.service';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.MATERIALS])],
  controllers: [MaterialController],
  providers: [MaterialService],
})
export class MaterialModule {}
