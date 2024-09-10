/**
 * 手机号验证
 * @param phone 手机号
 */
function isPhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

/**
 * 用户账号验证,只能包括数字字母的组合，长度为4-15位
 * @param account 用户账号
 */
function isAccount(account: string): boolean {
  return /^[A-Z\d]{4,15}$/i.test(account)
}

/**
 * 邮箱验证
 * @param email 邮箱
 */
function isEmail(email: string): boolean {
  return /^\w+@[a-z\d]+\.[a-z]{2,4}$/.test(email)
}

const PROVINCE_CODE: Record<number, string> = {
  11: '北京',
  12: '天津',
  13: '河北',
  14: '山西',
  15: '内蒙古',
  21: '辽宁',
  22: '吉林',
  23: '黑龙江 ',
  31: '上海',
  32: '江苏',
  33: '浙江',
  34: '安徽',
  35: '福建',
  36: '江西',
  37: '山东',
  41: '河南',
  42: '湖北 ',
  43: '湖南',
  44: '广东',
  45: '广西',
  46: '海南',
  50: '重庆',
  51: '四川',
  52: '贵州',
  53: '云南',
  54: '西藏 ',
  61: '陕西',
  62: '甘肃',
  63: '青海',
  64: '宁夏',
  65: '新疆',
  71: '台湾',
  81: '香港',
  82: '澳门',
}

/**
 * 验证身份证的省份编号
 * @param content
 */
function checkProvince(content: string) {
  return !!(/^[1-9]\d/.test(content) && PROVINCE_CODE[Number.parseInt(content)])
}

/**
 * 验证身份证的出生日期
 * @param content
 */
function checkBirthday(content: string) {
  const pattern = /^(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:[0-2][1-9]|10|20|30|31)$/
  if (pattern.test(content)) {
    const year = content.substring(0, 4)
    const month = content.substring(4, 6)
    const date = content.substring(6, 8)
    const date2 = new Date(`${year}-${month}-${date}`)
    if (date2 && date2.getMonth() === (Number.parseInt(month) - 1))
      return true
  }
  return false
}

/**
 * 验证身份证的顺序码
 * @param content
 */
function checkCode(content: string) {
  const p = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|1[0-2])(?:[0-2][1-9]|10|20|30|31)\d{3}[\dX]$/i
  const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const parity = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  const code = content.substring(17)
  if (p.test(content)) {
    let sum = 0
    for (let i = 0; i < 17; i++)
      sum += Number.parseInt(content.charAt(i)) * factor[i]

    if (parity[sum % 11] === code.toUpperCase())
      return true
  }
  return false
}

/**
 * 验证身份证号码
 * @param content
 */
function isIdCard(content: string) {
  if (checkCode(content)) {
    const date = content.substring(6, 14)
    if (checkBirthday(date) && checkProvince(content.substring(0, 2)))
      return true
  }
  return false
}

export {
  isAccount as verifyAccount,
  isEmail as verifyEmail,
  isIdCard as verifyIdCard,
  isPhone as verifyPhone,
}
