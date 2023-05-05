import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const BufferFile = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.bufferFile;
  },
);
