const MESSAGE = {
  USER_REGISTER: "USer Registered Successfully",
  USER_REGISTER_ERR: "Error In Craeting User",
  ALREDY_EXISTS: "USer Already Exists",
  LOGIN: "USer Logged In ",
  LOGIN_ERR: "Error in USer Logging",
  ALL_FILEDS_REQ: "All Fields are Mandatory",
  USER_NOT_FOUND: "USer Not Found",
  INVALID_CREDENTIALS: "Insert Valid Credentials",
  NO_FILE_UPLOADED: "No file uploaded",
  USERS_IMPORTED_SUCCESS : "User Imported Success",
  NO_VALID_DATA: "No valid data"
};

const STATUS_CODE = {
  SUCCESS: 200,
  NEW_CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQ: 400,
  UNAUTHORIZED: 401,
  FORBIDDETN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERR: 500,
  ALREADY_EXITS: 409
};

export { MESSAGE, STATUS_CODE };