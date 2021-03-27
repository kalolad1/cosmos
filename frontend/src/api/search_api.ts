import * as apiEndpointConstants from '../constants/api_endpoint_constants';
import * as axiosConfig from '../configs/axios_config';
import * as urlUtil from '../util/url_util';

/**
 * Sends a search request and returns back results.
 *
 * @param query - The search query.
 * @param client - Axios instance used to make request.
 */
export function search(query: string, client = axiosConfig.axiosClient) {
    const endpoint = urlUtil.getUrlPathWithQueryParams(
        apiEndpointConstants.SEARCH,
        query
    );
    return client.post(endpoint);
}
