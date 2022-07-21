import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt/bcrypt.service';

@Global()
@Module({
	exports: [BcryptService],
	providers: [BcryptService]
})
export class SharedModule {}
