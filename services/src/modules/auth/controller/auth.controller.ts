import { Body, Controller, Post, UseGuards, Headers, Req } from '@nestjs/common';
import { SignInDto, SignUpDto } from '@wire/dto';
import { AuthService } from '../services';
import { JwtAuthGuard } from '../guards';

@Controller('auth')
export class AuthController {

  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('sign-up')
  signUn(@Body() dto: SignUpDto): Promise<string> {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  signIn(@Body() dto: SignInDto): Promise<string> {
    return this.authService.signIn(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  signOut(@Headers('authorization') authHeader: string): Promise<void> {
    return this.authService.signOut(authHeader);
  }
}
