import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { InstituteModule } from './institute/institute.module';
import { CourseModule } from './course/course.module';
import { IntakeModule } from './intake/intake.module';

@Module({
  imports: [UsersModule, CommonModule, AuthorizationModule, InstituteModule, CourseModule, IntakeModule],
  exports: [],
})
export class ModulesModule {}
