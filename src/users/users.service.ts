import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
	ErrorHandlerService,
	Role,
	SharedService,
	User,
	UserDocument,
	UserReadables
} from '@shared';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>,
		private errorHandler: ErrorHandlerService,
		private sharedService: SharedService
	) {}

	async findUser(filter, projection: string[]): Promise<User> {
		const user = await this.userModel.findOne(filter, projection);
		return user;
	}

	async findCurrentUser(userId): Promise<User> {
		const user = await this.userModel.findOne({ _id: userId }, UserReadables.UserPublic);
		return user;
	}

	async findUsers(filter, projection: string[]): Promise<User[]> {
		const user = await this.userModel.find(filter, projection);
		return user;
	}

	// async findUserByQueryParam(
	// 	queryParams,
	// 	projections?: string[],
	// 	nestedProjections?: string[]
	// ): Promise<User> {
	// 	let filterObject = {};
	// 	for (let i in queryParams) {
	// 		filterObject[i] = { $eq: queryParams[i] };
	// 	}
	// 	const user = await this.userModel
	// 		.findOne(filterObject, projections)
	// 		.populate('ConnectedPersonId', ['FirstName']);
	// 	return user;
	// }

	async createUser(createUserDto: CreateUserDto): Promise<any> {
		const createdUser: CreateUserDto = {
			...createUserDto,
			Roles: [Role.Student],
			ConnectedPersonId: this.sharedService.getUID()
		};
		return await this.userModel.create(createdUser).catch((err) => {
			this.errorHandler.userCreationError(err);
		});
	}

	async updateUserRefreshToken(userId: string, refreshTokenHashed: string) {
		return await this.userModel.updateOne(
			{ _id: userId },
			{ RefreshTokenHash: refreshTokenHashed }
		);
	}
}
