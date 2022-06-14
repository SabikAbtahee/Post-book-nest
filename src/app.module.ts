import { environment } from '@environment';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.DatabaseConnectionString, {
      connectionFactory: (connection) => {
        connection.plugin(require('./shared/plugins/global.plugins').updateLastUpdateDate);
        return connection;
      },
    }),
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
