import { apiConfig } from '../../../core/config/apiConfig';
import { apiClient } from '../../../shared/utils/apiClient';

export const apiAuth = apiClient(apiConfig.AUTH_API_URL, {}, false);
export const apiUsers = apiClient(apiConfig.AUTH_API_URL);
