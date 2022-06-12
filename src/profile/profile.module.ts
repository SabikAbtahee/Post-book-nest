import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Person, PersonSchema } from '../shared/schemas/Person.schemal';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Person.name.toString(),
        useFactory: () => {
          const schema = PersonSchema;
          schema.pre('updateOne', function () {
            this.set({ LastUpdateDate: new Date() });
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
