import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { JwtConfigService } from './jwt.config.service';
import { LocalAuthGuard, JwtAuthGuard } from '../../common/guards';
import { LocalStrategy, JwtStrategy } from '../../common/strategies';
import { jwtConfig } from '../../configs';
import { ConfigType } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      inject: [jwtConfig.KEY],
      useFactory: async (config: ConfigType<typeof jwtConfig>) => config
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtConfigService, LocalAuthGuard, LocalStrategy, JwtAuthGuard, JwtStrategy]
})
export class AuthModule {}
