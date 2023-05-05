import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignInDto, SignUpDto } from '@wire/dto';
import { AuthValidationService } from './auth-validation.service';
import { RepositoryService, User } from '@wire/repository';
import { UserMapperService } from '@wire/mappers';
import { AuthHelperService } from './auth-helper.service';

@Injectable()
export class AuthService {

  constructor(
    private validationService: AuthValidationService,
    private repository: RepositoryService,
    private userMapper: UserMapperService,
    private helper: AuthHelperService,
  ) { }

  async signUp(dto: SignUpDto): Promise<string> {
    await this.validationService.notExistByEmail(dto.username);

    try {
      const encodedPassword = await this.helper.encodePassword(dto.password);
      const userDto = this.userMapper.signUpToUser(dto, encodedPassword);
      const user = await this.repository.user.save(userDto);

      return this.generateToken(user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async signIn(dto: SignInDto): Promise<string> {
    const user = await this.validationService.existsByEmail(dto.username);
    await this.validationService.comparePasswords(dto.password, user.password);

    try {
      return this.generateToken(user);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async signOut(authHeader: string): Promise<void> {
    try {
      const token = authHeader.replace('Bearer ', '');
      const sessionId = this.helper.decodeToken(token).jti;
      await this.repository.session.delete(sessionId);

      return;
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  private async generateToken(user: User): Promise<string> {
    const session = await this.repository.session.save({ user });
    const token = await this.helper.signToken(user.userId, session.sessionId);
    const expires = this.helper.decodeToken(token)?.exp;

    await this.repository.session.save({
      ...session,
      expiresAt: new Date(expires * 1000),
    });

    return token;
  }
}
