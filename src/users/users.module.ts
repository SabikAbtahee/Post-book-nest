import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from '@shared';
import { User, UserSchema } from '../shared/schemas/User.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: User.name.toString(),
				schema: UserSchema
			},
            // {
			// 	name: Person.name.toString(),
			// 	schema: PersonSchema
			// }
		])
	],
    controllers:[UsersController],
	providers: [UsersService],
	exports: [UsersService]
})
export class UsersModule {}
