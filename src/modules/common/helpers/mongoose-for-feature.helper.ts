import { MongooseModule } from '@nestjs/mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { schemaAccessCredentials } from 'src/modules/authorization/models/access_credentials.model';
import { schemaRefreshToken } from 'src/modules/authorization/models/refresh_tokens.model';
import { schemaUser } from 'src/modules/users/models/user.model';
import { schemaInstitute } from 'src/modules/institute/model/intitute.model';
import { schemaCourse } from 'src/modules/course/model/course.model';
import { schemaIntake } from 'src/modules/intake/model/intake.model';
import { schemaCourseIntake } from 'src/modules/course-intake/models/course-intake.model';
import { schemaMaterial } from 'src/modules/material/models/materials.model';
import { schemaAttendance } from 'src/modules/attendance/models/attendance.model';
import { schemaEnrollement } from 'src/modules/enrollment/models/enrollment.model';

const getCollections = (collections: DB_COLLECTIONS[]) => {
  if (!collections || collections.length === 0) {
    throw new Error('Collection list cannot be empty');
  }

  return MongooseModule.forFeature(
    collections.map((name) => {
      switch (name) {
        case DB_COLLECTIONS.USERS:
          return { name, schema: schemaUser };
        case DB_COLLECTIONS.ACCESS_CREDENTIALS:
          return { name, schema: schemaAccessCredentials };
        case DB_COLLECTIONS.REFRESH_TOKENS:
          return { name, schema: schemaRefreshToken };
        case DB_COLLECTIONS.INSTITUTES:
          return { name, schema: schemaInstitute };
        case DB_COLLECTIONS.COURSES:
          return { name, schema: schemaCourse };
        case DB_COLLECTIONS.INTAKES:
          return { name, schema: schemaIntake };
        case DB_COLLECTIONS.COURSE_INTAKES:
          return { name, schema: schemaCourseIntake };
        case DB_COLLECTIONS.MATERIALS:
          return { name, schema: schemaMaterial };
        case DB_COLLECTIONS.ATTENDANCE:
          return { name, schema: schemaAttendance };
        case DB_COLLECTIONS.ENROLLMENT:
          return { name, schema: schemaEnrollement };
        default:
          throw new Error('Invalid collection name or invalid Schema mapping');
      }
    }),
  );
};

export default { getCollections };
