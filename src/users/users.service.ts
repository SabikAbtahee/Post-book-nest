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

	async doesEmailExist(email: string): Promise<boolean> {
		const isFound = await this.userModel.findOne({ Email: { $eq: email } });
		return !!isFound;
	}

	async findCurrentUser(userId): Promise<User> {
		const user = await this.userModel.findOne({ _id: userId }, UserReadables.UserPublic);
		return user;
	}

	async findUsers(filter, projection: string[]): Promise<User[]> {
		const user = await this.userModel.find(filter, projection);
		return user;
	}

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
