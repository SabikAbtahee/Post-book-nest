import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Course, CourseDocument, ErrorHandlerService } from '@shared';
import { Model } from 'mongoose';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
	constructor(
		@InjectModel(Course.name)
		private readonly courseModel: Model<CourseDocument>,
		private errorHandler: ErrorHandlerService
	) {}

	create(createCourseDto: CreateCourseDto) {
		return 'This action adds a new course';
	}

	async findAll(filter, projection: string[]): Promise<Course[]> {
		return await this.courseModel.find(filter, projection);
	}

	async findOne(filter, projection: string[]): Promise<Course> {
		return await this.courseModel.findOne(filter, projection);
	}

	update(id: number, updateCourseDto: UpdateCourseDto) {
		return `This action updates a #${id} course`;
	}

	remove(id: number) {
		return `This action removes a #${id} course`;
	}
}
