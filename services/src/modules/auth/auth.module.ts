import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationKeys, ConfigurationService } from '@wire/configuration';
import { AuthService, AuthValidationService, AuthHelperService } from './services';
import { JwtStrategy } from './strategies';
import { AuthController } from './controller/auth.controller';
import { RepositoryModule } from '@wire/repository';
import { MappersModule } from '@wire/mappers';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigurationService) => ({
        secret: config.get(ConfigurationKeys.JwtSecret),
        signOptions: {
          expiresIn: config.get(ConfigurationKeys.JwtExpires),
        },
      }),
      inject: [ConfigurationService],
    }),
    RepositoryModule,
    MappersModule,
  ],
  providers: [
    AuthValidationService,
    JwtStrategy,
    AuthService,
    AuthHelperService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
