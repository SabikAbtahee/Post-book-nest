import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../shared/schemas/User.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name.toString(),
				schema: UserSchema
			}
		])
	],
    controllers:[UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
