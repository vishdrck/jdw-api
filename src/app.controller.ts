import { All, Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { HealthResponseDTO } from './health-response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: HealthResponseDTO })
  @ApiOperation({ summary: 'Check API health' })
  getHello() {
    return this.appService.getHello();
  }

  @All()
  notFoundExecption(): void {
    throw new NotFoundException();
  }
}
