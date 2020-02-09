import {request} from "./request"

export function getHomeMultidata(params) {
    return  request({
        url:'/home/multidata'
    })
}
 //需要传参数时
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params:{
            type,
            page,
        }
    })
    
}