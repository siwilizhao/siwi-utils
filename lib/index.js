const crypto = require('crypto')
const MD5_SECRET = 'SIWI-MD-SHA256-RANDOM'
const CIPHER_SECRET = 'SIWI-CIPHER_SECRET-RANDOM'
const DECIPHER_SECRET = 'SIWI-DECIPHER_SECRET-RANDOM'
let instance = null
class Utils {
    constructor() {
        if (!instance) {
            instance = this
        } 
        return instance
    }

    /**
     * 延迟 duration 毫秒执行
     * @param {等待时长毫秒} duration 
     */
    async wait(duration) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true)
            }, duration)
        })
    }
    /**
     * 获取指定日期unix时间戳  默认返回零点时间戳
     * @param {日期} date 
     * @param {小时} hours 
     * @param {分钟} minutes 
     * @param {秒} seconds 
     * @param {毫秒} millseconds 
     */
    async time(date = false, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        return new Promise((resolve, reject) => {
            const res = date ? new Date(date) : new Date()
            res.setHours(hours)
            res.setMinutes(minutes)
            res.setSeconds(seconds)
            res.setMilliseconds(milliseconds)
            const timestamp = Math.floor(res.getTime() / 1000)
            resolve(timestamp)
        })
    }

    /**
     * 简单MD5
     * @param {加密字符} data
     */
    async md5(data) {
        return new Promise((resolve, reject) => {
            resolve(crypto.createHash('md5', MD5_SECRET).update(data, 'utf8').digest('hex'))
        })
    }

    /**
     * sha256 加密
     * @param {*} data 
     */
    async sha256(data) {
        return new Promise((resolve, reject) => {
            resolve(crypto.createHmac('sha256', MD5_SECRET).update(data, 'utf8').digest('hex'))
        })
    }

    /**
     * 判断是否存在
     * @param {*} needle 
     * @param {*} array 
     */
    async in_array(needle, arr) {
        return new Promise((resolve, reject) => {
            const check = arr.includes(needle)
            resolve(check)
        })
    }

    /**
     * 编码
     * @param {} str 
     * @param {*} prefix 
     * @param {*} length 
     */
    async idencode(id, prefix, length) {
        return new Promise((resolve, reject) => {
            const res = prefix + id.padStart(length, 0)
            resolve(res)
        })
    }

    /**
     * 解编码
     * @param {*} code 
     * @param {*} prefix 
     */
    async iddecode(code, prefix) {
        return new Promise((resolve, reject) => {
            const res = code.match(/^LPK(0+)/i)
            if (res) {
                resolve(code.replace(res[0], ''))
            }
            reject('非法code')
        })
    }

    /**
     * 加密
     * @param {*} data 
     */
    async cipher(data) {
        const cipher = crypto.createCipher('aes192', CIPHER_SECRET)
        let encrypted = cipher.update(data, 'utf8', 'hex')
        encrypted += cipher.final('hex')
        return encrypted
    }
    /**
     * 解密
     * @param {*} data 
     */
    async decipher(data) {
        const decipher = crypto.createDecipher('aes192', DECIPHER_SECRET)
        let decrypted = decipher.update(data, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    }

    /**
     * 检查必要参数
     * @param {*} require 
     * @param {*} data 
     */
    async check_require(require, data) {
        for (let key of require) {
            if (key in data) {
                continue
            } else {
                return `缺少必要参数${key}`
            }
        }
        return false;
    }
    /**
     * 获取随验证码
     */
    async getRandCode() {

    }

    async getPage(count, page = 1, size = 50) {
        let total_page = Math.ceil(count / size)
        let pager = {
            total_page: total_page,
            current_page: page,
            per_page: (page - 1) > 1 ? page - 1 : 1,
            next_page: (page + 1) < total_page ? page + 1 : total_page,
            total_row: count,
            page_size: size
        }
        return pager
    }


}

module.exports = new Utils()