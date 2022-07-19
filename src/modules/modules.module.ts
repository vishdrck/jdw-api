import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { InstituteModule } from './institute/institute.module';

@Module({
  imports: [UsersModule, CommonModule, AuthorizationModule, InstituteModule],
  exports: [],
})
export class ModulesModule {}
