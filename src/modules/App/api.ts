import ApiClient, { AxiosResponse } from 'api';

export const BASE_URL = 'https://asia-northeast1-commitly-27919.cloudfunctions.net';

const apiClient = new ApiClient(BASE_URL);

export default class Api {
  static test(): Promise<AxiosResponse<any>> {
    return apiClient.get();
  }
}
