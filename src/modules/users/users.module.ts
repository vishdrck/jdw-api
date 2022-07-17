import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import mongooseForFeatureHelper from '../common/helpers/mongoose-for-feature.helper';
import { DB_COLLECTIONS } from 'src/constants/enums';

@Module({
  imports: [mongooseForFeatureHelper.getCollections([DB_COLLECTIONS.USERS])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
