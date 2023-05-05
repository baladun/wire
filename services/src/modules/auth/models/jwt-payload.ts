export interface JwtPayload {
  iss: string;
  sub: number;
  jti: string;
  iat?: number;
  exp?: number;
}
