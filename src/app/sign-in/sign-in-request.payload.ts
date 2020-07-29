export interface SignInRequestPayload {
  username: String,
  password: String
}

export interface SignInResponse {
  accessToken: String
  refreshToken: String
}
