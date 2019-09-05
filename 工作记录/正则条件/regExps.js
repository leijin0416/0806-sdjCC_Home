/**
 *      ( num * value ).toFixed(4);     -四舍五入
 *      parseFloat(this.otcList.sell_lave_count);   -转换为数值
 * 
 *      正则验证
 *      -使用：
 *          import {regs, regex, reEmail, myreg, regNum} from '@/assets/js/regExps.js'  // 模块中引入
 *      
 *      -判断
 *          !regNum.test(showKeyValue)   //不为纯数字时
 * 
 * ************************************************ */

 /**
  *  特殊字符
  */
export const regs = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

 /**
  *  邮箱格式
  */
export const regex = /\@/g;
export const reEmail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;  

 /**
  *  手机格式
  */
export const myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;  

 /**
  *  纯数字
  */
export const regNum = /^[0-9]*$/; 

/**
 *  整数
 */
export const regnber = /^\+?[1-9][0-9]*$/; 

/**
 *  证件号
 */
export const format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/; 

// https://www.cnblogs.com/bert227/p/10260424.html
