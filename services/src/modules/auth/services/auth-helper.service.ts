import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from '../models';

@Injectable()
export class AuthHelperService {

  constructor(
    private jwtService: JwtService,
  ) { }

  async encodePassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);

    return bcrypt.hash(password, salt);
  }

  signToken(userId: number, sessionId: string): Promise<string> {
    const payload: JwtPayload = {
      iss: 'Wire',
      sub: userId,
      jti: sessionId,
    };

    return this.jwtService.signAsync(payload);
  }

  decodeToken(token: string): JwtPayload {
    return this.jwtService.decode(token) as JwtPayload;
  }

  comparePasswords(fromDto: string, fromDb: string): Promise<boolean> {
    return bcrypt.compare(fromDto, fromDb);
  }
}
