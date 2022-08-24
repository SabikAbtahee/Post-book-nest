import { IsUUID } from 'class-validator';

export class BaseDto {
	@IsUUID()
	_id?: string;
	LastUpdateDate?: Date;
	CreateDate?: Date;
}
