import { Injectable } from '@nestjs/common';
import { User } from '../../schemas/User.schema';
import { SignUpDto } from '../../../auth/dto/sign-up.dto';
import { CreateUserDto } from '../../../users/dto/create-user.dto';
import {
	AccessTokenPayload,
	RefreshTokenPayload
} from '../../../shared/interfaces/token.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class SharedService {
	convertSignUpDtoToCreateUserDto(signUpDto: SignUpDto): CreateUserDto {
		return {
			UserName: signUpDto.UserName,
			Email: signUpDto.Email,
			Password: signUpDto.Password,
			Roles: [],
			ConnectedPersonId: null
		};
	}

	makeAccessTokenPayloadFromUser(user: User): AccessTokenPayload {
		return {
			Email: user.Email,
			Roles: user.Roles,
			sub: user._id,
			id: user._id,
			UserName: user.UserName
		};
	}

	makeRefreshTokenPayloadFromUser(user: User): RefreshTokenPayload {
		return {
			id: user._id,
			sub: user._id
		};
	}

	getUID(): string {
		return uuid();
	}
}
