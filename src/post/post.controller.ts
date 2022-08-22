import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetCurrentUser, UserReadables } from '@shared';

@Controller('post')
export class PostController {
	constructor(private readonly postService: PostService) {}

	@Post()
	create(@Body() createPostDto: CreatePostDto, @GetCurrentUser('id') userId: string) {
		createPostDto = { ...createPostDto, Author: userId };
		return this.postService.create(createPostDto);
	}

	@Get()
	findAll() {
		return this.postService.findAll({}, UserReadables.Post);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.postService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(+id, updatePostDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postService.remove(+id);
	}
}
