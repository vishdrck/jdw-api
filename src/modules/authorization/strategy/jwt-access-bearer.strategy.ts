import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG_KEYS } from 'src/modules/common/constants/enums';
import { JwtPayloadDTO } from '../dto/jwt-payload.dto';

@Injectable()
export class JWTAccessBearerStrategy extends PassportStrategy(Strategy, 'JWT_ACCESS_BEARER') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(CONFIG_KEYS.JWT_SECRET),
    });
  }

  // async validate(payload: JwtPayloadDTO): Promise {}
}
