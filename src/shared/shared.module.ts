import { Global, Module } from '@nestjs/common';
import { BcryptService } from './services/bcrypt/bcrypt.service';
import { ErrorHandlerService } from './services/error-handler/error-handler.service';
import { SharedService } from './services/shared/shared.service';
import { ConfigService } from './services/config/config.service';

@Global()
@Module({
	exports: [BcryptService, SharedService, ErrorHandlerService, ConfigService],
	providers: [BcryptService, SharedService, ErrorHandlerService, ConfigService]
})
export class SharedModule {}
