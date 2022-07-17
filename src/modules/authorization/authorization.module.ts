import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DB_COLLECTIONS } from 'src/constants/enums';
import { AuthorizationController } from './controllers/authorization.controller';
import { AuthorizationService } from './services/authorization.service';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.ACCESS_CREDENTIALS, DB_COLLECTIONS.REFRESH_TOKENS]), JwtModule.register({})],
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
})
export class AuthorizationModule {}
