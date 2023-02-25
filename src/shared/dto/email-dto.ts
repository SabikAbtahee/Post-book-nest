import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailDto {
	@IsNotEmpty()
	@IsEmail()
	Email: string;
}
