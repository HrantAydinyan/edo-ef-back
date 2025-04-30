import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestWithAdmin } from '../interfaces';

export const AdminData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<IRequestWithAdmin>();

    return request.user;
  },
);
