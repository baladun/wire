import { Injectable } from '@nestjs/common';
import { User } from '@wire/repository';
import { SignUpDto } from '@wire/dto';

@Injectable()
export class UserMapperService {

  signUpToUser(dto: SignUpDto, password: string): User {
    const user = new User();

    user.email = dto.username;
    user.password = password;

    return user;
  }
}
