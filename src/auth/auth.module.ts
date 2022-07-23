import { environment } from '@environment';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from '../profile/profile.module';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAccessStrategy } from './strategies/jwt_access.strategy';
import { JwtRefreshStrategy } from './strategies/jwt_refresh.strategy';

@Module({
	providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
	imports: [
		UsersModule,
        ProfileModule,
		PassportModule,
		JwtModule.register({
			signOptions: { expiresIn: environment.AccessTokenExpirationTimeInSeconds }
		})
	],
	controllers: [AuthController]
})
export class AuthModule {}
