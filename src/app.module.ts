import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/PostBook'), ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
