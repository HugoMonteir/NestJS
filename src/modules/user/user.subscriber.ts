import { EntityManager, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { User } from './entities';
import { BadRequestException } from '@nestjs/common';
import { CryptUtil } from '../../common/utils/crypt.util';

export class UserSubscriber implements EntitySubscriberInterface<User> {
  public listenTo(): typeof User {
    return User;
  }

  public async beforeInsert(event: InsertEvent<User>): Promise<void> {
    const { entity, manager } = event;

    if (!entity) {
      return;
    }

    await this._checkEmailUniqueness(entity as User, manager);
    await this._checkUsernameUniqueness(entity as User, manager);
    await this._hashInsertedPassword(event);
  }

  public async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    const { entity, manager } = event;

    if (!entity) {
      return;
    }

    await this._checkEmailUniqueness(entity as User, manager);
    await this._checkUsernameUniqueness(entity as User, manager);
    await this._hashUpdatedPassword(event);
  }

  private async _checkEmailUniqueness(entity: User, manager: EntityManager): Promise<void> {
    const user = await manager.getRepository(User).findOneBy({ email: entity.email });

    if (user && user.id !== entity.id) {
      throw new BadRequestException(`The email '${entity.email}' is already in use`);
    }
  }

  private async _checkUsernameUniqueness(entity: User, manager: EntityManager): Promise<void> {
    const user = await manager.getRepository(User).findOneBy({ username: entity.username });

    if (user && user.id !== entity.id) {
      throw new BadRequestException(`The username '${entity.username}' is already in use`);
    }
  }

  private async _hashPassword(user: User): Promise<void> {
    const salt = await CryptUtil.generateSalt();
    user.password = await CryptUtil.hashPassword(user.password, salt);
    user.salt = salt;
  }

  private async _hashInsertedPassword(event: InsertEvent<User>): Promise<void> {
    const user = event.entity;

    await this._hashPassword(user);

    return;
  }

  private async _hashUpdatedPassword(event: UpdateEvent<User>): Promise<void> {
    const user = event.entity as User;

    const currentRecord = await event.manager.getRepository(User).findOneBy({ id: user.id });

    if (currentRecord.password && user.password && user.password !== currentRecord.password) {
      await this._hashPassword(user);
    }

    return;
  }
}
