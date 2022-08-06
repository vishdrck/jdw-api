import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONFIG_KEYS } from 'src/modules/common/constants/enums';
import { IUser } from 'src/modules/users/models/user.model';
import { UsersService } from 'src/modules/users/services/users.service';
import { JwtPayloadDTO } from '../dto/jwt-payload.dto';

@Injectable()
export class JWTAccessBearerStrategy extends PassportStrategy(Strategy, 'JWT_ACCESS_BEARER') {
  constructor(config: ConfigService, private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(CONFIG_KEYS.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayloadDTO) {
    const foundUser = await this.userService.findById(payload.sub);
    if (!foundUser || foundUser.isDeleted) return null;

    return foundUser;
  }
}
