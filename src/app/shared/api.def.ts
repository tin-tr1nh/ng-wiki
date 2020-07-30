export class ApiDef {
  public static readonly BACKEND_ENDPOINT = 'http://localhost:8080';

  public static readonly SIGN_UP_ENDPOINT = `${ApiDef.BACKEND_ENDPOINT}/auth/register`;
  public static readonly SIGN_IN_ENDPOINT = `${ApiDef.BACKEND_ENDPOINT}/auth/login`;
  public static readonly REFRESH_TOKEN_ENDPOINT = `${ApiDef.BACKEND_ENDPOINT}/auth/refresh-token`;

  public static readonly TEST_ENDPOINT = `${ApiDef.BACKEND_ENDPOINT}/auth/test`;


  public static readonly POSTS_ENDPOINT = `${ApiDef.BACKEND_ENDPOINT}/posts`
  public static readonly USER_ME_ENDPOINT = `${ApiDef.BACKEND_ENDPOINT}/user/me`
}
