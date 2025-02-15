import { Test, TestingModule } from '@nestjs/testing';
import { JwtConfigService } from '../../../../src/modules/auth/jwt.config.service';
import { jwtConfig } from '../../../../src/configs';
import { jwtConfigMock } from './auth-data-mock.constants';

describe('JwtConfigService', () => {
  let service: JwtConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtConfigService,
        {
          provide: jwtConfig.KEY,
          useValue: jwtConfigMock
        }
      ]
    }).compile();

    service = module.get<JwtConfigService>(JwtConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAccessConfig', () => {
    it('should return the access configuration', () => {
      const accessConfig = service.getAccessConfig();
      expect(accessConfig).toEqual(jwtConfigMock.access);
    });
  });

  describe('getRefreshConfig', () => {
    it('should return the refresh configuration', () => {
      const refreshConfig = service.getRefreshConfig();
      expect(refreshConfig).toEqual(jwtConfigMock.refresh);
    });
  });

  describe('createJwtOptions', () => {
    it('should return jwt options with secret and access signOptions', () => {
      const jwtOptions = service.createJwtOptions();
      expect(jwtOptions).toEqual({ secret: jwtConfigMock.secret, signOptions: jwtConfigMock.access.signOptions });
    });
  });
});
