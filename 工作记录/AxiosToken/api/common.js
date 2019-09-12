/**   
 *  [ api接口统一管理 ]   
 *     
 *  “引入axios的封装方法”
 *  import { post } from '@/common/api/http'
 */
import request from '@/common/api/http'

/**
 *  Common
 * 
 *  import { get, post } from '@/common/api/http'
 *  export const apiAddress = params => post('pCNotHomePage?type' + '=' + 5, params);
 * 
 */

export const getAdminList = (params) => {
    return request('post', 'pCNotHomePage?type' + '=' + 5, params);
}
