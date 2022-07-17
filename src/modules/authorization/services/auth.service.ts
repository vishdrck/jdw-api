import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CONFIG_KEYS } from 'src/modules/common/constants/enums';
import { IUser } from 'src/modules/users/models/user.model';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  private async signToken(payload: any, expiresIn: string) {
    return this.jwt.signAsync(payload, {
      expiresIn,
      secret: this.config.get(CONFIG_KEYS.JWT_SECRET),
    });
  }

  async getTokens(user: IUser) {
    const payload = {
      userID: user._id,
    };
    const access_token = await this.signToken(payload, this.config.get(CONFIG_KEYS.ACCESS_TOKEN_EXPIRY_DURATION));
    return { access_token };
  }
}
