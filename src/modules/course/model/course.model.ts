import { Document, Schema } from 'mongoose';
import { BaseEntitySchemaContent, IBaseEntity } from 'src/modules/common/models/base-entity.model';

export interface IIntroVideos {
  name: string;
  url: string;
}

export interface ICourse extends IBaseEntity {
  name: string;
  description: string;
  bannerImage: string;
  introVideos: IIntroVideos[];
  courseType?: string;
  note?: string;
}

const schemaIntroVideos = new Schema<IIntroVideos>({
  name: String,
  url: String,
});

export type ICourseModel = ICourse & Document;

export const schemaCourse = new Schema<ICourse>({
  ...BaseEntitySchemaContent,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  bannerImage: {
    type: String,
    required: true,
  },
  introVideos: {
    type: [schemaIntroVideos],
  },
  courseType: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
});
