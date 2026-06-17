export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  lastName: string | null;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type JwtPayload = {
  sub: string;
  sessionId: string;
};

export type RequestUser = AuthUser & {
  sessionId: string;
};
