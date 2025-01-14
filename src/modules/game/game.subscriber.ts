import { EntityManager, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Game } from './entities';
import { BadRequestException } from '@nestjs/common';

@EventSubscriber()
export class GameSubscriber implements EntitySubscriberInterface<Game> {
  public listenTo() {
    return Game;
  }

  public async beforeInsert(event: InsertEvent<Game>) {
    const { entity, manager } = event;
    await this.checkNameUniqueness(entity as Game, manager);
  }

  public async beforeUpdate(event: UpdateEvent<Game>) {
    const { entity, manager } = event;
    await this.checkNameUniqueness(entity as Game, manager);
  }

  private async checkNameUniqueness(entity: Game, manager: EntityManager) {
    if (!entity) {
      return;
    }

    const game = await manager.getRepository(Game).findOneBy({ name: entity.name });

    if (game && game.id !== entity.id) {
      throw new BadRequestException(`The name '${entity.name}' is already in use.`);
    }
  }
}
