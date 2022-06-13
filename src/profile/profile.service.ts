import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Person, PersonDocument } from '../shared/schemas/Person.schema';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Person.name)
    private readonly personModel: Model<PersonDocument>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Person> {
    const createdPerson = await this.personModel.create(createProfileDto);
    return createdPerson;
  }

  findAll() {
    return `This action returns all profile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profile`;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto): Promise<any> {
    const createdPerson = await this.personModel.updateOne(
      { _id: id },
      updateProfileDto,
    );
    return createdPerson;
  }

  remove(id: number) {
    return `This action removes a #${id} profile`;
  }
}
