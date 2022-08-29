import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Chapter, EntityBase, EntityNames, EntityNamesClass } from '@shared';

export type CourseDocument = Course & Document;

@Schema({
	collection: EntityNames.Courses,
	autoIndex: false,
	optimisticConcurrency: true
})
export class Course extends EntityBase {
	@Prop({
		required: true
	})
	Title: string;

	@Prop({
		required: true,
		maxlength: 800
	})
	Description: string;

	@Prop({ type: Object, required: false })
	Chapters: Chapter;

}

export const CourseSchema = SchemaFactory.createForClass(Course);