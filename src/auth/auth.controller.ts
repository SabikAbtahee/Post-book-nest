import { Controller, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { GetCurrentUser, JwtAuthGuard, JwtRefreshGuard, Token } from '@shared';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('signin')
	@HttpCode(HttpStatus.OK)
	async signIn(@Body() signInDto: SignInDto) {
		return this.authService.signIn(signInDto);
	}

	@Post('signup')
	@HttpCode(HttpStatus.CREATED)
	signUp(@Body() signUpDto: SignUpDto): Promise<Token> {
		return this.authService.signUp(signUpDto);
	}

	@UseGuards(JwtAuthGuard)
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	logOut(@GetCurrentUser('id') userId: string) {
		return this.authService.logOut(userId);
	}

	@UseGuards(JwtRefreshGuard)
	@Post('refresh')
	refreshToken(
		@GetCurrentUser('refreshToken') refreshToken: string,
		@GetCurrentUser('id') userId: string
	) {
		return this.authService.refreshToken(userId, refreshToken);
	}
}
