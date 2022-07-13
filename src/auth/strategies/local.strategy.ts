import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthConst } from '../constants/auth.const';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
        usernameField:AuthConst.Username,
        passwordField:AuthConst.Password
    });
  }

  async validate(Username: string, Password: string): Promise<any> {
    const user = await this.authService.validateUser(Username, Password);
    if (!user) {
      throw new UnauthorizedException(); // Make a good error throwing interface constant or model
    }
    return user;
  }
}