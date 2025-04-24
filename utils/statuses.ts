export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
};

const ErrorMessages = {
  USER_NOT_FOUND: "User not found",
  SERVER_ERROR: "Internal Server Error",
  UNAUTHORIZED: "Unauthorized",
  URL_NOT_FOUND: "URL not found",
  URL_ALREADY_EXISTS: "URL already exists",
  INVALID_URL: "Invalid URL",
  URL_CREATION_FAILED: "URL creation failed",
  URL_DELETION_FAILED: "URL deletion failed",
  URL_UPDATE_FAILED: "URL update failed",
};

export const ErrorStatuses = {
  USER_NOT_FOUND: {
    message: ErrorMessages.USER_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    code: "USER_NOT_FOUND",
  },
  SERVER_ERROR: {
    message: ErrorMessages.SERVER_ERROR,
    status: HttpStatus.INTERNAL_ERROR,
    code: "SERVER_ERROR",
  },
  UNAUTHORIZED: {
    message: ErrorMessages.UNAUTHORIZED,
    status: HttpStatus.UNAUTHORIZED,
    code: "UNAUTHORIZED",
  },
  URL_NOT_FOUND: {
    message: ErrorMessages.URL_NOT_FOUND,
    status: HttpStatus.NOT_FOUND,
    code: "URL_NOT_FOUND",
  },
  URL_ALREADY_EXISTS: {
    message: ErrorMessages.URL_ALREADY_EXISTS,
    status: HttpStatus.BAD_REQUEST,
    code: "URL_ALREADY_EXISTS",
  },
  INVALID_URL: {
    message: ErrorMessages.INVALID_URL,
    status: HttpStatus.BAD_REQUEST,
    code: "INVALID_URL",
  },
  URL_CREATION_FAILED: {
    message: ErrorMessages.URL_CREATION_FAILED,
    status: HttpStatus.INTERNAL_ERROR,
    code: "URL_CREATION_FAILED",
  },
  URL_DELETION_FAILED: {
    message: ErrorMessages.URL_DELETION_FAILED,
    status: HttpStatus.INTERNAL_ERROR,
    code: "URL_DELETION_FAILED",
  },
  URL_UPDATE_FAILED: {
    message: ErrorMessages.URL_UPDATE_FAILED,
    status: HttpStatus.INTERNAL_ERROR,
    code: "URL_UPDATE_FAILED",
  },
};

const SuccessMessages = {
  SUCCESS: "Success",
  CREATED: "Created",
  DELETED: "Deleted",
  UPDATED: "Updated",
};

export const SuccessStatuses = {
  SUCCESS: {
    message: SuccessMessages.SUCCESS,
    status: HttpStatus.OK,
    code: "SUCCESS",
  },
  CREATED: {
    message: SuccessMessages.CREATED,
    status: HttpStatus.CREATED,
    code: "CREATED",
  },
  DELETED: {
    message: SuccessMessages.DELETED,
    status: HttpStatus.OK,
    code: "DELETED",
  },
  UPDATED: {
    message: SuccessMessages.UPDATED,
    status: HttpStatus.OK,
    code: "UPDATED",
  },
};
