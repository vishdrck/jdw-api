import { MongooseModule } from '@nestjs/mongoose';
import { DB_COLLECTIONS } from 'src/modules/common/constants/enums';
import { schemaAccessCredentials } from 'src/modules/authorization/models/access_credentials.model';
import { schemaRefreshToken } from 'src/modules/authorization/models/refresh_tokens.model';
import { schemaUser } from 'src/modules/users/models/user.model';

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
        default:
          throw new Error('Invalid collection name or invalid Schema mapping');
      }
    }),
  );
};

export default { getCollections };
