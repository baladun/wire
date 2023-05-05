import { Global, Module } from '@nestjs/common';
import { BufferInterceptor } from '@wire/core/interceptors';
import { BucketService, PageableService } from './services';

@Global()
@Module({
  providers: [
    BufferInterceptor,
    BucketService,
    PageableService,
  ],
  exports: [
    BucketService,
    PageableService,
  ],
})
export class CoreModule {}
