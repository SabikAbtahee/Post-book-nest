import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
	AccessToken,
	BcryptService,
	ConfigService,
	EmailDto,
	ErrorHandlerService,
	ResetPasswordLinkResponse,
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
import { EmailService } from '../mailer/services/mailer/mailer.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private bcryptService: BcryptService,
		private bcrypt: BcryptService,
		private sharedService: SharedService,
		private configService: ConfigService,
		private profileService: ProfileService,
		private errorHandler: ErrorHandlerService,
		private emailService: EmailService
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

	async sendPasswordResetEmail(email: string): Promise<ResetPasswordLinkResponse> {
		const emailFound = await this.usersService.doesEmailExist(email);
		if (!emailFound) this.errorHandler.emailNotFound();
		const user = await this.usersService.findUser({ Email: { $eq: email } }, UserReadables.User);
		const token = await this.generatePasswordResetToken(user);
		const resetPasswordUrl = `${this.configService.get('AppURL')}/reset-password?token=${token}`;
		const sentMessageInfo = await this.emailService.sendEmail(
			email,
			'Forgot Password Reset Link',
			resetPasswordUrl
		);
		return {
			MessageId: sentMessageInfo.messageId,
			Success: true
		};
	}

	private async generatePasswordResetToken(user: User) {
		const payload = { sub: user._id, pass: user.Password };
		const options = {
			expiresIn: this.configService.get('PasswordResetExpirationTime'),
			secret: this.configService.get('JwtResetPasswordTokenSecretKey')
		};
		return await this.jwtService.signAsync(payload, options);
	}

	async getTokens(user: any): Promise<Token> {
		return {
			access_token: await this.jwtService.signAsync(
				this.sharedService.makeAccessTokenPayloadFromUser(user),
				{
					secret: this.configService.get('JwtAccessTokenSecretKey'),
					expiresIn: this.configService.get('AccessTokenExpirationTimeInSeconds')
				}
			),
			refresh_token: await this.jwtService.signAsync(
				this.sharedService.makeRefreshTokenPayloadFromUser(user),
				{
					secret: this.configService.get('JwtRefreshTokenSecretKey'),
					expiresIn: this.configService.get('RefreshTokenExpirationTimeInSeconds')
				}
			)
		};
	}

	async getAccessToken(user: any): Promise<AccessToken> {
		return {
			access_token: await this.jwtService.signAsync(
				this.sharedService.makeAccessTokenPayloadFromUser(user),
				{
					secret: this.configService.get('JwtAccessTokenSecretKey'),
					expiresIn: this.configService.get('AccessTokenExpirationTimeInSeconds')
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
