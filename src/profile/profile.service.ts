import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorHandlerService, SharedService } from '@shared';
import { Model } from 'mongoose';
import { Person, PersonDocument } from '../core/schemas/Person.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
	constructor(
		@InjectModel(Person.name)
		private readonly personModel: Model<PersonDocument>,
		private errorHandler: ErrorHandlerService,
		private sharedService: SharedService
	) {}

	async createProfile(createProfileDto: CreateProfileDto, ItemId?: string): Promise<any> {
		return await this.personModel
			.create({ _id: ItemId ? ItemId : this.sharedService.getUID(), ...createProfileDto })
			.catch((err) => {
				this.errorHandler.personMutationError(err);
			});
	}

	async findAll() {
		const persons = await this.personModel.find();
		return persons;
	}

	findOne(id: string) {
		return `This action returns a #${id} profile`;
	}

	async update(updateProfileDto: UpdateProfileDto): Promise<any> {
		const { _id, ...result } = updateProfileDto;
		return await this.personModel
			.updateOne({ _id: _id }, result)
			.then((res) => {
				return this.errorHandler.checkNotMatchedError(res);
			})
			.catch((err) => {
				this.errorHandler.personMutationError(err);
			});
	}

	remove(id: number) {
		return `This action removes a #${id} profile`;
	}
}
