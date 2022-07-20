import { EntityNames } from '../constants/Entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from './EntityBase.schema';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Person } from './Person.schema';

export type UserDocument = User & Document;

@Schema({
	collection: EntityNames.Users,
	autoIndex: false,
	optimisticConcurrency: true
})
export class User extends EntityBase {
	@Prop({
		unique: true,
		index: true
	})
	UserName: string;

	@Prop({
		immutable: true,
		unique: true
	})
	Email: string;

	@Prop()
	Password: string;

	@Prop()
	Roles: string[];

	@Prop({
		type: String,
		ref: 'Person'
	})
	PersonId: Person;
}

export const UserSchema = SchemaFactory.createForClass(User);
