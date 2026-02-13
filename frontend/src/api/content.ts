import { apiClient } from './client';
import { SearchResponse } from '../types/content';

export const searchContent = async (limit: number = 9, offset: number = 0, query: string = "", sortBy?: any, filters?: any): Promise<SearchResponse['result']> => {
    const response = await apiClient.post<SearchResponse>('/content/v1/search', {
        request: {
           limit,
           offset,
           query,
           sort_by: sortBy,
           filters: filters
        }
    });
    return response.data.result;
};
