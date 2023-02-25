import { Controller, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { EmailDto, GetCurrentUser, JwtAuthGuard, JwtRefreshGuard, Token } from '@shared';
import { Public } from 'src/core/decorators/isPublic.decorator';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Public()
	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async signIn(@Body() signInDto: SignInDto) {
		return await this.authService.signIn(signInDto);
	}

	@Public()
	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	async signUp(@Body() signUpDto: SignUpDto): Promise<Token> {
		return await this.authService.signUp(signUpDto);
	}

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logOut(@GetCurrentUser('id') userId: string) {
		return await this.authService.logOut(userId);
	}

	@Public()
	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	async refreshToken(
		@GetCurrentUser('refreshToken') refreshToken: string,
		@GetCurrentUser('id') userId: string
	) {
		return await this.authService.refreshToken(userId, refreshToken);
	}

	@Public()
	@Post('forgot-password')
	@HttpCode(HttpStatus.OK)
	async forgotPassword(@Body() emailDto: EmailDto) {
		const { Email } = emailDto;
		return await this.authService.sendPasswordResetEmail(Email);
	}

	@Public()
	@Post('reset-password')
	async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {}
}
