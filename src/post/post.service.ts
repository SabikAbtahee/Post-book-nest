import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ErrorHandlerService, Post, PostDocument } from '@shared';
import { Model } from 'mongoose';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto, UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
	constructor(
		@InjectModel(Post.name)
		private readonly postModel: Model<PostDocument>,
		private errorHandler: ErrorHandlerService
	) {}

	async create(createPostDto: CreatePostDto) {
		return await this.postModel.create(createPostDto);
	}

	// async upload(){

	//     return await this.postModel.updateOne()
	// }

	async findAll(filter, projection: string[]): Promise<Post[]> {
		return await this.postModel.find(filter, projection).populate('Author', ['UserName']);
	}

	findOne(id: number) {
		return `This action returns a #${id} post`;
	}

	async update(id: string, updatePostDto: UpdatePostDto) {
		return await this.postModel.updateOne({ _id: id }, updatePostDto);
	}

	async remove(id: string) {
		return await this.postModel.deleteMany({ _id: id });
	}

	async patch(id: string, updatePostDto: UpdatePostDto): Promise<any> {
		return await this.postModel
			.updateOne({ _id: id }, updatePostDto)
			.then((res) => {
				return this.errorHandler.checkNotMatchedError(res);
			})
			.catch((err) => {
				this.errorHandler.personMutationError(err);
			});
	}

	async likePost(id: string, likePostDto: LikePostDto): Promise<any> {
		return await this.postModel
			.updateOne({ _id: id }, { $push: { Likes: likePostDto.Likes } })
			.then((res) => {
				return this.errorHandler.checkNotMatchedError(res);
			})
			.catch((err) => {
				this.errorHandler.personMutationError(err);
			});
	}

	async unlikePost(id: string, likePostDto: LikePostDto): Promise<any> {
		return await this.postModel
			.updateOne({ _id: id }, { $pull: { Likes: likePostDto.Likes } })
			.then((res) => {
				return this.errorHandler.checkNotMatchedError(res);
			})
			.catch((err) => {
				this.errorHandler.personMutationError(err);
			});
	}
}
