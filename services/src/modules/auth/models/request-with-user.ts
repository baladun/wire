import { User } from '@wire/repository';

export interface RequestWithUser extends Request {
  user: User;
}
