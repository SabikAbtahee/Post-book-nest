import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@shared';
import { CoreModule } from '../core/core.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [
        CoreModule,
		MongooseModule.forFeature([
			{
				name: User.name.toString(),
				schema: UserSchema
			}
		])
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
