import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { AuthorizationModule } from '../authorization/authorization.module';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.USERS]), forwardRef(() => AuthorizationModule)],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
