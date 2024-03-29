enum STATUS {
    SUCCESS = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    REDIRECTED = 301,
    FAILED = 400,
    UNAUTHORIZED = 401,
    TOKEN_EXPIRED = 500,
    PHONE_AND_EMAIL_EMPTY = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    PASSWORD_NOT_MATCH = 405,
    ACCOUNT_ALREADY_EXISTS = 406,
    PASSWORD_EMPTY = 407,
    USERNAME_EMPTY = 408,
    ACCESS_TOKEN_INVALID = 409,
    EMAIL_EMPTY = 410,
  }
  export default STATUS
  