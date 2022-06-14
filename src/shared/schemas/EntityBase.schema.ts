import { Prop, Schema } from '@nestjs/mongoose';
import { v4 as uuid } from 'uuid';

@Schema()
export class EntityBase {
	@Prop({
		type: String,
		required: true,
		default: () => uuid()
	})
	_id: string;

	@Prop({
		type: Date,
		required: true,
		default: () => new Date()
	})
	LastUpdateDate: Date;

	@Prop({
		type: Date,
		required: true,
		default: () => new Date()
	})
	CreateDate: Date;

	//   LastUpdatedBy
	//   IdsAllowedToRead
	//   IdsAllowedToWrite
	//   IdsAllowedToDelete
	//   RolesAllowedToRead
	//   RolesAllowedToWrite
	//   RolesAllowedToDelete
	//   Tags
	// CreateDate
	// CreatedBy
	// IsMarkedToDelete
	// Language
}
