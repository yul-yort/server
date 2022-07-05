import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//TODO: 
export const UserEmail = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
})