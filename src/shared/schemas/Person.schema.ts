import { EntityNames } from '../constants/Entities';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EntityBase } from './EntityBase.schema';
export type PersonDocument = Person & Document;

@Schema({
	collection: EntityNames.Persons,
	autoIndex: false,
	optimisticConcurrency: true
})
export class Person extends EntityBase {
	@Prop()
	FirstName: string;

	@Prop()
	LastName: string;

	@Prop()
	DateOfBirth: Date;

	@Prop()
	PhoneNumber: string;

	@Prop()
	Address: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
