import { EntityNames, EntityNamesClass } from '../constants/Entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EntityBase } from './EntityBase.schema';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Person } from './Person.schema';
import { Role } from '../enums/Role.enum';

export type UserDocument = User & Document;

@Schema({
	collection: EntityNames.Users,
	autoIndex: false,
	optimisticConcurrency: true
})
export class User extends EntityBase {
	@Prop({
		unique: true,
		index: true,
		required: true,
		immutable: true
	})
	UserName: string;

	@Prop({
		immutable: true,
		unique: true,
		required: true
	})
	Email: string;

	@Prop({
		required: true,
        select: false
	})
	Password: string;

    @Prop({
		required: false
	})
	RefreshTokenHash: string;

	@Prop()
	Roles: Role[];

	@Prop({
		type: String,
		ref: EntityNamesClass.Person,
		autopopulate: true,
        immutable:true
	})
	ConnectedPersonId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
