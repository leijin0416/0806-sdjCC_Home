import dayjs from 'dayjs';

/**
 * 格式化时间戳（秒|毫秒）
 * @param {timestamp} value
 */
const timeFilter = (value) => {
    value = value.toString();
    if (value) {
        if (value.length === 13) {
            return dayjs(Number(value)).format("YYYY-MM-DD HH:mm:ss");
        }
        return dayjs.unix(Number(value)).format("YYYY-MM-DD HH:mm:ss");
    } else {
        return '-';
    }
}

const  getDateTime = (value) => {
    let date = new Date(value)
    let y = date.getFullYear()
    let MM = date.getMonth() + 1
        MM = MM < 10 ? ('0' + MM) : MM
    let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
        h = h < 10 ? ('0' + h) : h
    let m = date.getMinutes()
        m = m < 10 ? ('0' + m) : m
    let s = date.getSeconds()
        s = s < 10 ? ('0' + s) : s
    return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
}

/**
 * 手机号格式化
 * @param {String} phone
 */
const formatPhone = (phone) => {
    phone = phone.toString();
    return phone.substr(0, 3) + '****' + phone.substr(7, 11);
};

/**
 * 4位一空格（格式化银行卡）
 * @param {String} val
 */
const formatBank = (val) => {
    if (val) {
        return val.toString().replace(/\s/g, '').replace(/(.{4})/g, "$1 ");
    }
};

/**
 * 千分位格式化
 * @param {数字} val
 */
const toThousands = (val) => {
    let num = (val || 0).toString(),
        result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return result;
}

/**
 * 格式化小数位
 * @param val 传入的值
 * @param pos 保留的小数位
 * @returns {*}
 */
const formatFloat = (val, pos = 2) => {
    let f = parseFloat(val);
    if (isNaN(f)) {
        return false;
    }
    f = Math.round(val * Math.pow(10, pos)) / Math.pow(10, pos); // pow 幂
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + pos) {
        s += '0';
    }
    return s;
}

/**
 * 格式化时长
 * @param second
 * @returns {string}
 */
const realFormatSecond = (second) => {
    let secondType = typeof second;

    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);

        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;

        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        return '0:00:00'
    }
};

/**
 * 处理浮点数小数位数
 */
const  toNumFixed = (input, num) => Number(input).toFixed(num)

export default {
    timeFilter,
    formatPhone,
    formatBank,
    toThousands,
    formatFloat,
    realFormatSecond,
    toNumFixed,
    getDateTime
}
