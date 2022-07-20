import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person, PersonDocument } from '@shared';
import { Model } from 'mongoose';
import { User, UserDocument } from '../shared/schemas/User.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>
	) // @InjectModel(Person.name)
	// private readonly personModel: Model<PersonDocument>

	{}

	async findByUserName(username: string): Promise<User> {
		const user = await this.userModel.findOne({
			Username: { $eq: username }
		});
		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.userModel.findOne({
			Email: { $eq: email }
		});
		return user;
	}

	async findUserByQueryParam(queryParams, projections): Promise<User> {
		console.log(Person.toString());
		let filterObject = {};
		for (let i in queryParams) {
			filterObject[i] = { $eq: queryParams[i] };
		}
		const user = await this.userModel.findOne(filterObject, projections).populate('PersonId');
		return user;
	}
}
