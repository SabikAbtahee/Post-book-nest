import { environment } from '@environment';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	providers: [AuthService, LocalStrategy,JwtStrategy],
	imports: [UsersModule, PassportModule,
        JwtModule.register({
            secret: environment.JwtAccessTokenSecretKey,
            signOptions: { expiresIn: environment.TokenExpirationTimeInSeconds }
            
          }),
    
    ],
	controllers: [AuthController]
})
export class AuthModule {}
