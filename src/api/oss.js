import axios from '@/libs/axios'
import baseURL from '_conf/url'

export const fileDownLoad = (id) => {
    return axios.get('api/com/comoss/download', {
        params: {
            id
        }
    })
}

export const fileDelete = (id) => {
    return axios.post('api/com/comoss/delete', {
        id
    })
}

export const fileList = (pageNo, pageSize, dataId, sortType) => {
    var body = {
        page: pageNo,
        limit: pageSize,
        dataId,
        sortType
    }

    return axios.post('api/com/comoss/list', body)
}

export const fileZip = (ids) => {
    if(window){
        window.open(`${baseURL}api/com/comoss/zip?ids=${ids}`)
    }
}
