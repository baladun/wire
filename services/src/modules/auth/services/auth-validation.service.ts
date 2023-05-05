import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtPayload } from '@wire/modules/auth/models';
import { ExceptionTypes } from '@wire/core/exception';
import { RepositoryService, User } from '@wire/repository';
import { AuthHelperService } from './auth-helper.service';

@Injectable()
export class AuthValidationService {

  constructor(
    private repository: RepositoryService,
    private helper: AuthHelperService,
  ) {
  }

  async notExistByEmail(email: string): Promise<void> {
    const exists = await this.repository.user.findOneBy({
      email,
    });

    if (exists) {
      throw new BadRequestException(ExceptionTypes.InvalidCredentials);
    }
  }

  async existsByEmail(email: string): Promise<User> {
    const exists = await this.repository.user.findOneBy({
      email,
    });

    if (!exists) {
      throw new BadRequestException(ExceptionTypes.InvalidCredentials);
    }

    return exists;
  }

  async comparePasswords(incomingPassword: string, userPassword: string): Promise<void> {
    const matched = await this.helper.comparePasswords(incomingPassword, userPassword);

    if (!matched) {
      throw new BadRequestException(ExceptionTypes.InvalidCredentials);
    }
  }

  async validateJwtPayload(payload: JwtPayload): Promise<User> {
    const session = await this.repository.session.findOneBy({ sessionId: payload.jti });
    const user = await this.repository.user.findOneBy({ userId: payload.sub });

    return session && new Date().getTime() < new Date(session.expiresAt).getTime() && user;
  }
}
