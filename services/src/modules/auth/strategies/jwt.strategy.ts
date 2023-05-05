import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigurationKeys, ConfigurationService } from '@wire/configuration';
import { JwtPayload } from '../models';
import { AuthValidationService } from '../services';
import { User } from '@wire/repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private config: ConfigurationService,
    private validationService: AuthValidationService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get(ConfigurationKeys.JwtSecret),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    return this.validationService.validateJwtPayload(payload);
  }
}
