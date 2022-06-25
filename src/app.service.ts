import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthResponseDTO } from './health-response.dto';
@Injectable()
export class AppService {
  constructor(private config: ConfigService) {}

  getHello(): HealthResponseDTO {
    return {
      statusCode: 200,
      message: `Welcome to JDW API v${this.config.get<string>('VERSION')}`,
    };
  }
}
