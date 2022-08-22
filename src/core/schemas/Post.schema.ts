import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Comments, EntityBase, EntityNames, EntityNamesClass, Status } from '@shared';
import { Schema } from '@nestjs/mongoose';

export type PostDocument = Post & Document;

@Schema({
	collection: EntityNames.Posts,
	autoIndex: false,
	optimisticConcurrency: true
})
export class Post extends EntityBase {
	@Prop({
		required: true
	})
	Title: string;

	@Prop({
		required: true,
		maxlength: 400
	})
	Description: string;

	@Prop({
		type: String,
		ref: EntityNamesClass.User,
		autopopulate: true,
		immutable: true
	})
	Author: string;

	@Prop({
		required: true
	})
	Status: Status;

	@Prop({ type: Object, required: false })
	Comments: Comments;

	@Prop({ type:Array<String>,required: false })
	Likes: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
