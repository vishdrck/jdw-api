import { Module } from '@nestjs/common';
import { IntakeService } from './services/intake.service';
import { IntakeController } from './controllers/intake.controller';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { DB_COLLECTIONS } from '../common/constants/enums';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.INTAKES])],
  controllers: [IntakeController],
  providers: [IntakeService],
  exports: [IntakeService],
})
export class IntakeModule {}
