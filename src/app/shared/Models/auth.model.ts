export interface Credential {
  client_secret: string;
  client_id: string;
  grant_type: string;
}

export interface LoginCredential extends Credential {
  username: string;
  password: string;
}

export interface RefreshTokenCredential extends Credential {
  refresh_token: string;
  scope: string;
}

export interface PassportCredential {
  token_type: string;
  expires_in: string;
  refresh_token: string;
  access_token: string;
}
