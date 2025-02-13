export interface JwtPayload {
  sub: number;
  type: 'access' | 'refresh';
}
