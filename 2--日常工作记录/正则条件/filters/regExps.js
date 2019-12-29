/**
  * 
    【变量暴露】
      export default 是默认导出
      export const 是命名导出
  * 
  *  验证特殊字符
  */
export const regs = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

/**
  *  验证邮箱格式
  */
export const regex = /\@/g;
export const reEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;  
export const rePattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;

/**
  *  验证手机格式
  */
export const myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/; 

//含大小写、数字
export const regZM = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,18}$/;  

/**
  *  验证纯数字
  */
export const regNum = /^[0-9]*$/; 

/**
 *  验证整数
 */
export const regnber = /^\+?[1-9][0-9]*$/; 

/**
 *  验证证件号
 */
export const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/; 

/**
 *  http://www.aijquery.cn/Html/jqueryjiqiao/200.html
 *  https://www.cnblogs.com/bert227/p/10260424.html
 *  */
