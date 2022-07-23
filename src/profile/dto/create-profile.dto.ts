import { BaseDto } from '@shared';
import { IsString,IsNotEmpty,IsDateString } from 'class-validator';

export class CreateProfileDto extends BaseDto {
	@IsString()
    @IsNotEmpty()
	FirstName: string;

	@IsString()
    @IsNotEmpty()
	LastName: string;

    @IsDateString()
	DateOfBirth: Date;

	@IsString()
    @IsNotEmpty()
	PhoneNumber: string;

	@IsString()
    @IsNotEmpty()
	Address: string;

    constructor(){
        super();
        this.FirstName = null;
        this.LastName = null;
        this.PhoneNumber = null;
        this.DateOfBirth = null;
        this.Address = null;
    }
}
