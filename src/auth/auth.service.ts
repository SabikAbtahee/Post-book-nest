import { environment } from '@environment';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService, ErrorHandlerService, SharedService, Token, User } from '@shared';
import { CreateProfileDto } from 'src/profile/dto/create-profile.dto';
import { ProfileService } from '../profile/profile.service';
import { UsersService } from '../users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private bcryptService: BcryptService,
		private bcrypt: BcryptService,
		private sharedService: SharedService,
		private profileService: ProfileService,
		private errorHandlerService: ErrorHandlerService
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.usersService.findByUserName(username);
		if (user && this.bcryptService.isPasswordMatchWithHash(pass, user.Password)) {
			const { Password, ...result } = user;
			return result;
		}
		return null;
	}

	async signIn(signInDto: SignInDto): Promise<Token> {
		const user = await this.usersService.findByUserName(signInDto.UserName);
		if (!user) this.errorHandlerService.userNotFound();
		const credentialMatches = this.bcryptService.isPasswordMatchWithHash(
			signInDto.Password,
			user.Password
		);
		if (!credentialMatches) this.errorHandlerService.passwordDoesNotMatch();

		const token = await this.getTokens(user);
		await this.updateRefreshTokenHash(user._id, token.refresh_token);
		return token;
	}

	async logOut(userId: string) {
		return await this.usersService.updateUserRefreshToken(userId, null);
	}

	async signUp(signUpDto: SignUpDto): Promise<Token> {
		const pass = signUpDto.Password;
		const passwordHash = await this.bcrypt.getHash(pass);
		signUpDto = { ...signUpDto, Password: passwordHash };
		const user: User = await this.usersService.createUser(
			this.sharedService.convertSignUpDtoToCreateUserDto(signUpDto)
		);
		this.createPersonForUser(user.ConnectedPersonId);

		const token = await this.getTokens(user);
		await this.updateRefreshTokenHash(user._id, token.refresh_token);
		return token;
	}

	refreshToken() {}

	async getTokens(user: any): Promise<Token> {
		return {
			access_token: await this.jwtService.signAsync(
				this.sharedService.makeAccessTokenPayloadFromUser(user),
				{
					secret: environment.JwtAccessTokenSecretKey,
					expiresIn: environment.AccessTokenExpirationTimeInSeconds
				}
			),
			refresh_token: await this.jwtService.signAsync(
				{},
				{
					secret: environment.JwtRefreshTokenSecretKey,
					expiresIn: environment.RefreshTokenExpirationTimeInSeconds
				}
			)
		};
	}

	async updateRefreshTokenHash(userId: string, rt: string) {
		const hash = await this.bcrypt.getHash(rt);
		return await this.usersService.updateUserRefreshToken(userId, hash);
	}

	createPersonForUser(UserId: string) {
		this.profileService.createProfile(new CreateProfileDto(), UserId);
	}
}
