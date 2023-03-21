import { environment } from '@environment';
import { ErrorMessages } from '@shared';
import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class ResetPasswordDto {
	@IsNotEmpty()
	@IsString()
	Token: string;

	@IsNotEmpty()
	@IsString()
	@Matches(environment.PasswordRegex, {
		message: ErrorMessages.InvalidPasswordRegex
	})
	Password: string;
}
