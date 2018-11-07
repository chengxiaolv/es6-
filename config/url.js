import env from './env'

// const DEV_URL = 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/'
const DEV_URL = '/'
// const DEV_URL = 'http://shendun.wesoft.cn/'

const PRO_URL = '/'
// const PRO_URL = 'https://produce.com'
// const PRO_URL = 'http://shendun.wesoft.cn/'

export default env === 'development' ? DEV_URL : PRO_URL
