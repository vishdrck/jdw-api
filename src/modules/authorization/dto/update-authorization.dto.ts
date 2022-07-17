import { PartialType } from '@nestjs/swagger';
import { SelfRegisterDTO } from './self-register.dto';

export class UpdateAuthorizationDto extends PartialType(SelfRegisterDTO) {}
