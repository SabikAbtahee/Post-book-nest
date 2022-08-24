import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { LikePostDto, UpdatePostDto } from './dto/update-post.dto';
import { GetCurrentUser, Role, Roles, SharedService, UserReadables } from '@shared';
import path = require('path');

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

	@Patch('ban/:id')
	@Roles(Role.Admin)
	banPost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.patch(id, updatePostDto);
	}

	@Patch('like/:id')
	likePost(@Param('id') id: string, @Body() likePostDto: LikePostDto) {
		return this.postService.likePost(id, likePostDto);
	}

	@Patch('unlike/:id')
	unlikePost(@Param('id') id: string, @Body() likePostDto: LikePostDto) {
		return this.postService.unlikePost(id, likePostDto);
	}

	@Patch(':id')
	updatePost(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
		return this.postService.update(id, updatePostDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.postService.remove(id);
	}
}
