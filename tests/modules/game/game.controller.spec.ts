import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from '../../../src/modules/game/game.controller';
import { GameService } from '../../../src/modules/game/game.service';

describe('GameController', () => {
  let controller: GameController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService]
    }).compile();

    controller = module.get<GameController>(GameController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
