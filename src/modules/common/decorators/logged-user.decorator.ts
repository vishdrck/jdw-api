import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { IUser } from 'src/modules/users/models/user.model';

export const LoggedUser = createParamDecorator((_data: void, ctx: ExecutionContext) => {
  const request: Request = ctx.switchToHttp().getRequest();

  return request.user as IUser;
});
