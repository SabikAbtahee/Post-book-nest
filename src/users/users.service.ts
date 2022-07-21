import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BcryptService, Roles } from '@shared';
import { Model } from 'mongoose';
import { User, UserDocument } from '../shared/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>,
		private bcrypt: BcryptService
	) {}

	async findByUserName(username: string): Promise<User> {
		const user = await this.userModel.findOne({
			Username: { $eq: username }
		},['UserName','Password']);
		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.userModel.findOne({
			Email: { $eq: email }
		});
		return user;
	}

	async findUserByQueryParam(
		queryParams,
		projections?: string[],
		nestedProjections?: string[]
	): Promise<User> {
		let filterObject = {};
		for (let i in queryParams) {
			filterObject[i] = { $eq: queryParams[i] };
		}
		const user = await this.userModel
			.findOne(filterObject, projections)
			.populate('ConnectedPersonId', ['FirstName']);
		return user;
	}

	async createUser(createUserDto: CreateUserDto): Promise<void> {
		const pass = createUserDto.Password;
		const hash = await this.bcrypt.getHashGivenPassword(pass);
		const createdUser = { ...createUserDto, Password: hash, Roles: [Roles.Student] };
		await this.userModel.create(createdUser);
	}
}
