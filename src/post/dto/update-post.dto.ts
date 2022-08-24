import { PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {}

export class LikePostDto {
	@IsOptional()
	@IsString()
	Likes: string;
}
