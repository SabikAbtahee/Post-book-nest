import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { environment } from '@environment';
import { Request } from 'express';
@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: environment.JwtRefreshTokenSecretKey,
			passReqToCallback: true
		});
	}

	async validate(req: Request, payload: any) {
		const refreshToken = req.get('authorization').replace('Bearer', '').trim;
		return {
			...payload,
			refreshToken
		};
		// return { userId: payload.sub, username: payload.UserName };
	}
}
