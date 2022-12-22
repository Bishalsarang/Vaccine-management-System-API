export interface AccessToken {
  accessToken: string;
}

export interface RefreshToken {
  refreshToken: string;
}

export interface AuthenticationToken extends AccessToken, RefreshToken {}

export interface JwtTokenPayloadWithoutType {
  id: number;
  email: string;
  userName: string;
}

export interface JwtTokenPayload extends JwtTokenPayloadWithoutType {
  type: 'access' | 'refresh';
}
