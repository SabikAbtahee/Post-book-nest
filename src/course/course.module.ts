import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { CoreModule } from 'src/core/core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course } from './entities/course.entity';
import { CourseSchema } from '@shared';

@Module({
	imports: [
		CoreModule,
		MongooseModule.forFeature([
			{
				name: Course.name.toString(),
				schema: CourseSchema
			}
		])
	],
	controllers: [CourseController],
	providers: [CourseService]
})
export class CourseModule {}
