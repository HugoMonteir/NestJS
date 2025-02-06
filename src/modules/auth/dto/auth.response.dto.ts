export class AuthResponseDto {
  public readonly accessToken: string;

  public readonly refreshToken: string;

  public constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
