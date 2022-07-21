import { environment } from '@environment';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ProfileModule } from './profile/profile.module';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';

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
        SharedModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
