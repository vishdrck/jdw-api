import { Types } from 'mongoose';

export class JwtPayloadDTO {
  sub: string;
  uuid: string;
  iat: number;
  exp: number;
}
