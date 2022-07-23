import { IsString,IsNotEmpty } from 'class-validator';

export class LogOutDto {
    @IsNotEmpty()
	@IsString()
	UserId: string;
}
