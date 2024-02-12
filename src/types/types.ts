export enum HTTP_METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum STATUS_CODE {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  CREATED = 201,
  NO_CONTENT = 204,
}

export enum ERROR_MESSAGE {
  INVALID_UID = "User is invalid UUId",
  USER_NOT_FOUND = "User not found",
  PAGE_NOT_FOUND = "Page not found",
  INVALID_DATA = "Invalid JSON data",
  TRY_AGAIN = "Sorry for inconvenience, please try again",
}
