/**
 * 请求统一管理
 */
import Request from '@/common/utils/http';

/* Common */
export const rankGender = params => Request.post('/api/pcUser/loginByPhone', params);