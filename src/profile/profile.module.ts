import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';

import { Person, PersonSchema } from '@shared';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Person.name.toString(),
        schema: PersonSchema,
      },
    ]),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
