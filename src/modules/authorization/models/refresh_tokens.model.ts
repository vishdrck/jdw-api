import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';
import { Document, Schema, SchemaTypes, Types } from 'mongoose';

export interface IRefreshToken extends IBaseEntity {
  userID: Types.ObjectId;
  token: string;
}

export type IRefreshTokenModel = IRefreshToken & Document;

export const schemaRefreshToken = new Schema<IRefreshTokenModel>(
  {
    ...BaseEntitySchemaContent,
    userID: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);
