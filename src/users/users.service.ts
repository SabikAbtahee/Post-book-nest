import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorHandlerService, Roles, SharedService } from '@shared';
import { Model } from 'mongoose';
import { User, UserDocument } from '../shared/schemas/User.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>,
		private errorHandler: ErrorHandlerService,
        private sharedService:SharedService
	) {}

	async findByUserName(username: string): Promise<User> {
		const user = await this.userModel.findOne(
			{
				UserName: { $eq: username }
			},
			['UserName', 'Password','Email','Roles']
		);
		return user;
	}

	async findByEmail(email: string): Promise<User> {
		const user = await this.userModel.findOne(
			{
				Email: { $eq: email }
			},
			['UserName', 'Password','Email','Roles']
		);
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

	async createUser(createUserDto: CreateUserDto): Promise<any> {
		const createdUser: CreateUserDto = {
			...createUserDto,
			Roles: [Roles.Student],
            ConnectedPersonId: this.sharedService.getUID()
		};
		return await this.userModel.create(createdUser).catch((err) => {
			this.errorHandler.userCreationError(err);
		});
	}

	async updateUserRefreshToken(userId: string, refreshTokenHashed: string) {
		return await this.userModel.updateOne({ _id: userId }, { RefreshTokenHash: refreshTokenHashed });
	}
}
