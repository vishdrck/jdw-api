import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { InstituteModule } from './institute/institute.module';
import { CourseModule } from './course/course.module';

@Module({
  imports: [UsersModule, CommonModule, AuthorizationModule, InstituteModule, CourseModule],
  exports: [],
})
export class ModulesModule {}
