import { BaseDto } from '@shared';
import {
	IsString,
	IsNotEmpty,
	IsDateString,
	Allow,
	IsNumberString,
	IsOptional
} from 'class-validator';

export class UpdateProfileDto extends BaseDto {
	@Allow()
	@IsOptional()
	@IsString()
	FirstName: string;
	@Allow()
	@IsOptional()
	@IsString()
	LastName: string;
	@Allow()
	@IsOptional()
	@IsDateString()
	DateOfBirth: Date;
	@Allow()
	@IsOptional()
	@IsNumberString()
	PhoneNumber: string;
	@Allow()
	@IsOptional()
	@IsString()
	Address: string;
}
