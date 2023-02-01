/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

interface APIResponse {
  data: {
    error: boolean;
    message: string;
  };
}

type UserAPIResponse = APIResponse & {
  data: {
    user: User;
  };
};

type LoginAPIResponse = APIResponse & {
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

type RefreshAccessTokenAPIResponse = APIResponse & {
  data: {
    accessToken: string;
  };
};
