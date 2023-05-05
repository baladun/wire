import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, switchMap } from 'rxjs';

@Injectable()
export class BufferInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    let data = Buffer.from('');

    return new Observable(obs => {
      req.on('data', chunk => {
        data = Buffer.concat([data, chunk]);
      });
      req.on('end', () => {
        req.bufferFile = data;
        obs.next();
        obs.complete();
      });
    }).pipe(switchMap(() => next.handle()));
  }
}
