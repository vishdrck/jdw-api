import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';
import { Document, Schema, SchemaTypes, Types } from 'mongoose';

export interface IAccessCredentials extends IBaseEntity {
  userID: Types.ObjectId;
  password: string;
}

export type IAccessCredentialsModel = IAccessCredentials & Document;

export const schemaAccessCredentials = new Schema<IAccessCredentialsModel>({
  ...BaseEntitySchemaContent,
  userID: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
