import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { InstituteModule } from './institute/institute.module';
import { CourseModule } from './course/course.module';
import { IntakeModule } from './intake/intake.module';
import { CourseIntakeModule } from './course-intake/course-intake.module';
import { MaterialModule } from './material/material.module';
import { AttendanceModule } from './attendance/attendance.module';
import { EnrollmentModule } from './enrollment/enrollment.module';

@Module({
  imports: [UsersModule, CommonModule, AuthorizationModule, InstituteModule, CourseModule, IntakeModule, CourseIntakeModule, MaterialModule, AttendanceModule, EnrollmentModule],
  exports: [],
})
export class ModulesModule {}
