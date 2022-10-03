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
		required: true
	})
	LastUpdateDate: Date;

	@Prop({
		type: Date,
		required: true
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
