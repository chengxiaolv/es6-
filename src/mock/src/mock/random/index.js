/*
    ## Mock.Random
    
    工具类，用于生成各种随机数据。
*/

import Util from '../util'
import basic from './basic'
import date from './date'
import image from './image'
import color from './color'
import text from './text'
import name from './name'
import web from './web'
import address from './address'
import helper from './helper'
import misc from './misc'

var Random = {
    extend: Util.extend
}

Random.extend(basic)
Random.extend(date)
Random.extend(image)
Random.extend(color)
Random.extend(text)
Random.extend(name)
Random.extend(web)
Random.extend(address)
Random.extend(helper)
Random.extend(misc)

export default Random