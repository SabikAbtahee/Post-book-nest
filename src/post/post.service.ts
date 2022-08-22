import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '@shared';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name)
		private readonly postModel: Model<PostDocument>
	) {}

	async create(createPostDto: CreatePostDto) {
		return await this.postModel.create(createPostDto);
	}

	async findAll(filter, projection: string[]):Promise<Post[]> {
		return await this.postModel.find(filter, projection).populate('Author', ['UserName']);
	}

	findOne(id: number) {
		return `This action returns a #${id} post`;
	}

	update(id: number, updatePostDto: UpdatePostDto) {
		return `This action updates a #${id} post`;
	}

	remove(id: number) {
		return `This action removes a #${id} post`;
	}
}
