import * as bcrypt from 'bcrypt';

export abstract class CryptUtil {
  public static async generateSalt(): Promise<string> {
    return await bcrypt.genSalt(10);
  }

  public static async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async validatePassword(passwordPlain: string, passwordCrypt: string, salt: string): Promise<boolean> {
    const hash = await this.hashPassword(passwordPlain, salt);
    return hash === passwordCrypt;
  }
}
