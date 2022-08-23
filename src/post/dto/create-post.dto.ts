import { Status } from '@shared';
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreatePostDto {
	@IsNotEmpty()
	@IsString()
	Title: string;

	@IsNotEmpty()
	@IsString()
	@Length(5, 400)
	Description: string;

    @IsOptional()
	@IsUUID('4')
	Author: string;

	@IsNotEmpty()
	@IsEnum(Status)
	Status: Status;
    
}
