import { environment } from '@environment';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    MongooseModule.forRoot(environment.DatabaseConnectionString),
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
