import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../shared/schemas/User.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>
	) {}
	private readonly users = [
		{
			userId: 1,
			username: 'john',
			password: 'changeme'
		},
		{
			userId: 2,
			username: 'maria',
			password: 'guess'
		}
	];

	async findByUserName(username: string): Promise<User> {
		const usess = await this.userModel.findOne({
			[User.prototype.Username]: { $eq: username }
		});
		return usess;
	}
}
