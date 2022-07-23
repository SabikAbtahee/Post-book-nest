import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { environment } from '@environment';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy,'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.JwtAccessTokenSecretKey,
      
    });
  }

  async validate(payload: any) {
    return payload;
    // return { userId: payload.sub, username: payload.UserName };
  }
}