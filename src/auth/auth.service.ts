import { environment } from '@environment';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	AccessToken,
	BcryptService,
	ErrorHandlerService,
	SharedService,
	Token,
	User,
	UserReadables
} from '@shared';
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
		private errorHandler: ErrorHandlerService
	) {}

	async signUp(signUpDto: SignUpDto): Promise<Token> {
		const pass = signUpDto.Password;
		const passwordHash = await this.bcrypt.getHash(pass);
		signUpDto = { ...signUpDto, Password: passwordHash };
		const user: User = await this.usersService.createUser(
			this.sharedService.convertSignUpDtoToCreateUserDto(signUpDto)
		);
		await this.createPersonForUser(user.ConnectedPersonId);

		const token = await this.getTokens(user);
		await this.updateRefreshTokenHash(user._id, token.refresh_token);
		return token;
	}

	async signIn(signInDto: SignInDto): Promise<Token> {
		const user = await this.usersService.findUser(
			{ UserName: { $eq: signInDto.UserName } },
			UserReadables.User
		);
		if (!user) this.errorHandler.userNotFound();
		const credentialMatches = this.bcryptService.isContentMatchWithHash(
			signInDto.Password,
			user.Password
		);
		if (!credentialMatches) this.errorHandler.passwordDoesNotMatch();

		const token = await this.getTokens(user);
		await this.updateRefreshTokenHash(user._id, token.refresh_token);
		return token;
	}

	async logOut(userId: string) {
		return await this.usersService.updateUserRefreshToken(userId, null).then((res) => {
			return this.errorHandler.checkNotMatchedError(res);
		});
	}

	async refreshToken(userId: string, refreshToken: string): Promise<AccessToken> {
		const user = await this.usersService.findUser({ _id: { $eq: userId } }, UserReadables.User);
		if (!user) this.errorHandler.userNotFound();
		if (!user.RefreshTokenHash) this.errorHandler.userLoggedOut();
		const credentialMatches = this.bcryptService.isContentMatchWithHash(
			refreshToken,
			user.RefreshTokenHash
		);
		if (!credentialMatches) this.errorHandler.inValidRefreshToken();
		const token = await this.getAccessToken(user);
		return token;
	}

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
				this.sharedService.makeRefreshTokenPayloadFromUser(user),
				{
					secret: environment.JwtRefreshTokenSecretKey,
					expiresIn: environment.RefreshTokenExpirationTimeInSeconds
				}
			)
		};
	}

	async getAccessToken(user: any): Promise<AccessToken> {
		return {
			access_token: await this.jwtService.signAsync(
				this.sharedService.makeAccessTokenPayloadFromUser(user),
				{
					secret: environment.JwtAccessTokenSecretKey,
					expiresIn: environment.AccessTokenExpirationTimeInSeconds
				}
			)
		};
	}

	async updateRefreshTokenHash(userId: string, rt: string) {
		const hash = await this.bcrypt.getHash(rt);
		return await this.usersService.updateUserRefreshToken(userId, hash);
	}

	async createPersonForUser(UserId: string) {
		await this.profileService.createProfile(new CreateProfileDto(), UserId);
	}
}
