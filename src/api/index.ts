import axios from "@/contexts/Axios";

/*
  POST /auth/v1/login

  Request Body:
    - email: string
    - password: string

  Response Body:
    - error: boolean
    - message: string
    - accessToken: string
*/
const login = (values: LoginInput): Promise<LoginAPIResponse> => {
  const { email, password } = values;

  return axios.post("/auth/v1/login", {
    email,
    password,
  });
};

/*
  POST /auth/v1/refresh

  Response Body:
    - error: boolean
    - message: string
    - accessToken: string
*/
const refreshAccessToken = (refreshToken: string): Promise<RefreshAccessTokenAPIResponse> => {
  return axios.post(
    "/auth/v1/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    }
  );
};

/*
  GET /api/v1/user

  Request Headers:
    - Authorization: Bearer <accessToken>

  Response Body:
    - error: boolean
    - message: string
    - user: User
*/
const getUser = (): Promise<UserAPIResponse> => {
  return axios.get("/api/v1/user");
};

/*
  GET /status/valid-clients

  Response Body:
    - error: boolean
    - message: string
    - version: string
*/
const getValidClients = (): Promise<GetValidClientsAPIResponse> => {
  return axios.get("/status/valid-clients");
};

/*
  POST /api/v1/admin/create-label-sheet

  Request Headers:
    - Authorization: Bearer <accessToken>

  Request Body:
    - labels: Label[]
*/
const createLabelSheet = (): Promise<CreateLabelSheetAPIResponse> => {
  return axios.post("/api/v1/admin/create-label-sheet");
};

/*
  POST /api/v1/admin/set-premium

  Request Headers:
    - Authorization: Bearer <accessToken>

  Request Body:
    - id: string
    - expiresIn: number (in seconds)
*/
const setPremium = (input: SetPremiumInput): Promise<SetPremiumAPIResponse> => {
  const { id, expiresIn } = input;

  return axios.post("/api/v1/admin/set-premium", {
    id,
    expiresIn,
  });
};

export default {
  login,
  getUser,
  refreshAccessToken,
  getValidClients,

  setPremium,
  createLabelSheet,
};
