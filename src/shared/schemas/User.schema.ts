import { EntityNames } from '../constants/Entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { EntityBase } from './EntityBase.schema';
import { Person } from './Person.schema';
export type UserDocument = User & Document;

@Schema({
	collection: EntityNames.Users,
	autoIndex: false,
	optimisticConcurrency: true
})
export class User extends EntityBase {
	@Prop()
	Username: string;

	@Prop({
		immutable: true
	})
	Email: string;

	@Prop()
	Password: string;

	@Prop()
	Roles: string[];

	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: EntityNames.Persons
	})
	Person: Person;
}

export const UserSchema = SchemaFactory.createForClass(User);
