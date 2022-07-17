import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { AuthorizationController } from './controllers/authorization.controller';
import { AccessCredentialsService } from './services/access_credential.service';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.ACCESS_CREDENTIALS]), JwtModule.register({}), forwardRef(() => UsersModule)],
  controllers: [AuthorizationController],
  providers: [AccessCredentialsService, AuthService],
  exports: [AccessCredentialsService],
})
export class AuthorizationModule {}
