import { Global, Module } from '@nestjs/common';
import { validationSchema } from './validation-schema';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: validationSchema,
    }),
  ],
  providers: [
    ConfigurationService,
  ],
  exports: [
    ConfigModule,
    ConfigurationService,
  ],
})
export class ConfigurationModule {}

