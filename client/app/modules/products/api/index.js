import { apiConfig } from '../../../core/config/apiConfig';
import { apiClient } from '../../../shared/utils/apiClient';

export const api = apiClient(apiConfig.PRODUCTS_API_URL);
