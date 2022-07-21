import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '@shared';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(private usersService: UsersService, private jwtService: JwtService,private bcryptService:BcryptService) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findByUserName(username);
		if (user && this.bcryptService.isPasswordMatchWithHash(pass,user.Password)) {
			const { Password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(user: any) {
        console.log(user);
		const payload = { username: user.UserName, sub: user.userId };
		return {
			access_token: this.jwtService.sign(user)
		};
	}
}
