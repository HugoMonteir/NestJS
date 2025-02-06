import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import { jwtConfig } from '../../configs';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  public constructor(@Inject(jwtConfig.KEY) private config: ConfigType<typeof jwtConfig>) {}

  public getAccessConfig(): JwtModuleOptions {
    return this.config.access;
  }

  public getRefreshConfig(): JwtModuleOptions {
    return this.config.refresh;
  }

  public createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.secret,
      signOptions: this.config.access.signOptions
    };
  }
}
