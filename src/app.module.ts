import { environment } from '@environment';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard, RolesGuard } from '@shared';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { MulterModule } from '@nestjs/platform-express';
import { CourseModule } from './course/course.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
	imports: [
		MongooseModule.forRoot(environment.DatabaseConnectionString, {
			connectionFactory: (connection) => {
				connection.plugin(require('./shared/plugins/global.plugins').updateLastUpdateDate);
				connection.plugin(
					require('./shared/plugins/global.plugins').onCreationGenericPropertyInsertion
				);
				connection.plugin(require('mongoose-unique-validator'));
				return connection;
			}
		}),
		ProfileModule,
		UsersModule,
		CoreModule,
		AuthModule,
		SharedModule,
		PostModule,
		MulterModule.register({
			dest: './uploads'
		}),
		CourseModule,
		QuizModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		}
	]
})
export class AppModule {}
