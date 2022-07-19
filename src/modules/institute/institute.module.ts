import { Module } from '@nestjs/common';
import { InstituteService } from './services/institute.service';
import { InstituteController } from './controllers/institute.controller';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';

import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.INSTITUTES])],
  controllers: [InstituteController],
  providers: [InstituteService],
})
export class InstituteModule {}
