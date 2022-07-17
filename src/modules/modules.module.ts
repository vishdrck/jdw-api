import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [UsersModule, CommonModule, AuthorizationModule],
  exports: [],
})
export class ModulesModule {}
