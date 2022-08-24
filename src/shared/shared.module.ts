import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt/bcrypt.service';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { SharedService } from './services/shared/shared.service';

@Global()
@Module({
	exports: [BcryptService, SharedService, ErrorHandlerService],
	providers: [BcryptService, SharedService, ErrorHandlerService]
})
export class SharedModule {}
