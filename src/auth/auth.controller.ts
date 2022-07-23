import { Controller, Request, Post, UseGuards, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard, Token } from '@shared';
import { AuthService } from './auth.service';
import { LogOutDto } from './dto/log-out.dto';
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

	@Post('logout')
    @HttpCode(HttpStatus.OK)
	logOut(@Body() logOutDto: LogOutDto) {
		return this.authService.logOut(logOutDto.UserId);
	}

	@Post('signup')
    @HttpCode(HttpStatus.CREATED)
	signUp(@Body() signUpDto: SignUpDto): Promise<Token> {
		return this.authService.signUp(signUpDto);
	}

	@Post('refresh')
	refreshToken() {
		return this.authService.refreshToken();
	}
}
