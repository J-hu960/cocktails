import { Body, Controller, Post} from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() body){
      return this.authService.signUp(body)
  }

  @Post('signIn')
  signIn(@Body() body){
      return this.authService.signIn(body)
  }




}
