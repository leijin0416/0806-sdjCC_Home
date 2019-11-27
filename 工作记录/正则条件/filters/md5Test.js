import CryptoJS from 'crypto-js'
// 后台密钥
const key = CryptoJS.enc.Utf8.parse('123456789*********01234')
const iv = CryptoJS.enc.Utf8.parse('01234567')

export default {
    // 解密方法
    Decrypt (word) {
        const decrypted = CryptoJS.TripleDES.decrypt(word,
        key, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv
        })
        return CryptoJS.enc.Utf8.stringify(decrypted).toString()
    },

    // 加密方法
    Encrypt (word) {
        let words = CryptoJS.enc.Utf8.parse(word)
        const encrypted = CryptoJS.TripleDES.encrypt(words,
        key, {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv
        })
        return encrypted.toString()
    }
}

/**
 *  3des加密data中的字符串  -浏览器 Request Payload
 */