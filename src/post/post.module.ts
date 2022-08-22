import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CoreModule } from '../core/core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '@shared';

@Module({
	imports: [
		CoreModule,
		MongooseModule.forFeature([
			{
				name: Post.name.toString(),
				schema: PostSchema
			}
		])
	],
	controllers: [PostController],
	providers: [PostService]
})
export class PostModule {}
