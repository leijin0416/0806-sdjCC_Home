/**   
 *  [ api接口统一管理 ]   
 *     
 */
import request from '@/common/api/http'

/**
 *  Common.js
 * 
 *  方二：
 *  import { get, post } from '@/common/api/http'
 *  export const apiAddress = params => post('pCNotHomePage?type' + '=' + 5, params);
 *  export const rankGender = data => request.post('market/ticker', data);
 * 
 */

export const getAdminList = (params) => {
    return request('post', 'pCNotHomePage?type' + '=' + 5, params);
}
